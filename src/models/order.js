import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    },
    discount:{
        code:String,
        value:Number
    },
    discountedPrice:{
        type:Number
    },
    productPicture:{
        type:String
    },
    orderStatus:{
        type:String,
        enum:['pending','complete','cancelled','rejected'],
        default:"pending"
    }
})

export const Order = mongoose.models.order || mongoose.model("order",orderSchema)