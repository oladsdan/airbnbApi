import userModel from "../models/userModels.js";
import validateDBid from "../utils/validateDBid.js";


export const likeListing = async (req, res) => {
    
    // get the current user
    const {_id:userId} = req.user;
    // we validate the id
    validateDBid(userId);

    // then we get the listing id from params
    const {id:listingId} = req.params;
    validateDBid(listingId);

    try {
        // const UsersData = await userModel.findByIdAndUpdate(userId)
        const usersListing = await userModel.findOne({favoriteIds: listingId}).exec();
        if(!usersListing){
            const usersData = await userModel.findByIdAndUpdate(userId,  {
                $push: {favoriteIds: listingId}
            }, {new: true})
            return res.sendStatus(201)
        }
        const usersDataAddFav = await userModel.findByIdAndUpdate(userId,  {
            $pull: {favoriteIds: listingId}
        }, {new: true})

        return res.sendStatus(201)
        
    } catch (error) {
        res.sendStatus(500)
        
    }

}