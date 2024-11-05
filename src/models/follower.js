import mongoose, { Schema } from "mongoose";

const followerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    followerCount:{
        type:Number,
        default:0
    }
})

export const Follower = mongoose.models.follower || mongoose.model("follower",followerSchema)