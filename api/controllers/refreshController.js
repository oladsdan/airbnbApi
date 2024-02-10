import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken';

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;
    console.log(refreshToken)


    //then we use it to find the user
     const foundUser = await userModel.find({refreshToken : refreshToken}).exec()
     console.log(foundUser)
     if(!foundUser) return res.sendStatus(403);// forbidden
    

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded)
            console.log("This is foundUser")
            console.log(foundUser)
            console.log(foundUser?._id)
            console.log(foundUser.name)
            // if(err || JSON.stringify(foundUser._id) !== decoded.id) return res.sendStatus(403);
            
            // the we give a new accessToken
            const Accesstoken = jwt.sign(
                {
                    "userid": decoded.id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "1m"}
            );
            res.json({Accesstoken})
        }
    )
}

export default handleRefreshToken
