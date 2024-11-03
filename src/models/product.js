import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ownedByUser:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    },
    discount:[{
        code:String,
        value:Number,
        available:Number
    }],
    visible:{
        type:Boolean
    },
    productPicture:{
        type:String
    },
    orders:[String]
})

export const Product = mongoose.models.product || mongoose.model("product",productSchema)