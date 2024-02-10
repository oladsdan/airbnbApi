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