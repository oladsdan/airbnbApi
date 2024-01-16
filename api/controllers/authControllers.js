// we have both the login and register function
import userModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateRefreshToken from '../config/refreshToken.js';

export const register = async (req, res) => {
    
        const {email, name, password} = req.body;
        const lowerCaseEmail = email.toLowerCase()
        const userData = {
            'email':lowerCaseEmail,
            name,
            password,
        }
    

        //we find if email address exist in the database
        const existEmail = await userModel.findOne({email: lowerCaseEmail}).exec();
        if(existEmail) return res.sendStatus(409); //meaning confilict
        try {
             //if email does not exist we proceed with the register
             const salt = await bcrypt.genSalt();
             const hashPassword = await bcrypt.hash(password, salt);
             const newUser = new userModel({ ...userData, password:hashPassword})
             // then we save the user to the database
             const savedUser = await newUser.save();
             res.status(201).json(savedUser)
            
        } catch (error) {
            res.status(500).json({ 'message': error.messaged})
            
        }
        

}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const lowerCaseEmail = email.toLowerCase()
    console.log(lowerCaseEmail)

    if(!lowerCaseEmail || !password) return res.status(400).json("Username and password required")

    try {
        //check if the email is valid
        const existUser = await userModel.findOne({email: lowerCaseEmail}).exec();
        if(!existUser) return res.status(400).json("Invalid email or password")
        
        //then we comparer password
        const decodedPassword = await bcrypt.compare(password, existUser.password)

        //if password
        if(decodedPassword){
            const accessToken = jwt.sign(
                {
                    "userid": existUser?._id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "30m"}
            )
            const refreshToken = await generateRefreshToken(existUser?._id);
        
            //then we save the refreshToken in the database
            existUser.refreshToken = refreshToken;
            await existUser.save();
            
            const userInfor = {
                "userId":existUser?._id,
                "userName":existUser?.name
            }

            //now we pass the refreshtoken as a cookie
            // res.cookie('refreshToken', refreshToken, { httpOnly : true, maxAge: 24 * 60 * 60* 1000} )
            res.cookie('refreshToken', refreshToken, { httpOnly : true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60* 1000} )
            // res.cookie('jwt', refreshToken, { httpOnly : true, maxAge: 24 * 60 * 60* 1000} )


            return res.status(201).json({'message':"you are logged", 'user':userInfor, 'Accesstoken':accessToken})
        } else {
            return res.status(403).json("Invalid email or password")
        }
        
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}