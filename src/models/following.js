import mongoose, { Schema } from "mongoose";

const followingSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    },
    follow:[{
        name: String,
        creatorId:String,
        profilePicture:String
    }],
    followCount:{
        type:Number,
        default:0
    }
})

export const Following = mongoose.models.following || mongoose.model("following",followingSchema)