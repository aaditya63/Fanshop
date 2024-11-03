import mongoose, { Schema } from "mongoose";

const creatorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Email Required !!"],
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true
    },
    DOB:Date,
    profilePicture:{
        type:String
    },
    about:{
        type:String,
    },
    socials:{
        facebook:String,
        youtube:String,
        x:String,
        other:String
    }
})

export const Creator = mongoose.models.creator || mongoose.model("creator",creatorSchema)