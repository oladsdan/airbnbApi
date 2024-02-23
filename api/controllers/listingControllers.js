import listingModel from '../models/listingModel.js';
import validateDBid from '../utils/validateDBid.js';


export const CreateListing = async (req, res) => {

    const createdListing = req.body;
    // const {}
    const {_id} = req.user;
    validateDBid(_id);

    try {

        const newListing = new listingModel({...createdListing, userId:_id })
        const savedListing = await newListing.save();
        return res.status(201).json(savedListing)
        
    } catch (error) {
        console.log(error)
        
    }


}

export const GetAllListing = async (req, res) => {
    
    try {
        const allListing = await listingModel.find().sort({createdAt: "desc"})
        return res.json(allListing)
    } catch (error) {
        res.sendStatus(500)
        
    }
}

export const GetListingbyId = async(req, res) => {
    const {id} = req.params;
    validateDBid(id)

    try {
        const listingData = await listingModel.findById(id).exec();
        if(!listingData) return res.sendStatus(404);
        return res.json(listingData)


    } catch(error) {
        res.sendStatus(500)
    }

}

export const GetListingsByUsers = async(req, res) => {
    const {_id:userId} = req.user;
    validateDBid(userId)

    try {
        const listingsByUser = await listingModel.find({userId: userId}).sort({createdAt: "desc"}).exec();
        if(!listingsByUser) return res.status(404).json("No listings created")
        return res.json(listingsByUser)
        
    } catch (error) {
        res.sendStatus(500)
    }

}

export const deleteListingByUsers = async(req, res) => {
    const {_id:userId} = req.user;
    validateDBid(userId)

    const{id:listingId} = req.params;
    validateDBid(listingId);
    
    try {
        //first we find if the users is the owner of the property to delete
        const usersProperty = await listingModel.findById(listingId).exec()
        if(!usersProperty) return res.status(404).json("Not Found")
        if(usersProperty?.userId.toString() === userId.toString()){
            const delListing = await listingModel.findByIdAndDelete(listingId)
            if(!delListing) return res.sendStatus(401);
            return res.sendStatus(201)

        }
        return res.sendStatus(403)

    } catch (error) {
        res.status(500).json(error)
    }




}