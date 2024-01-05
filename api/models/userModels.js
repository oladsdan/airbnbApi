import mongoose from "mongoose";

//Declare the Schema for the user
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password: {
        type:String
    },
    emailVerified:{
        type: Date,
    },
    image: {
        type: String
    },
    favoriteIds: { type: mongoose.Schema.Types.ObjectId},
    accounts:  { type: mongoose.Schema.Types.ObjectId, ref:"Account" }, //this will be used for our social logins
    
    reservations :  { type: mongoose.Schema.Types.ObjectId, ref:"Reservations"} 


}, {timestamps: true})

const userModel = mongoose.model('User', userSchema);
export default userModel