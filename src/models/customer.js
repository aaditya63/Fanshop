import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
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
    }
})

export const Customer = mongoose.models.customer || mongoose.model("customer",customerSchema)