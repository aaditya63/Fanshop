import { Product } from "@/models/product";
import { NextResponse } from "next/server";

const { default: ConnectDB } = require("@/helper/db");

ConnectDB();

//API to Delete a Product
export async function DELETE(request,{params}){
    const {userId,productId} = params;
    try{
        //Authenticate User and Product are genuine by using AuthToken    
        await Product.findByIdAndDelete(productId);
        
        const response = NextResponse.json({
            msg:"Product is Deleted",
            success:true
        })
        return response;
    }
    catch(error){
        const response = NextResponse.json({
            msg:"Product is not Deleted",
            success:false
        })
        return response;
    }
}


//API to update product
export async function PUT(request,{params}){
    const {userId,productId} = await params;
    const {name,description,quantity,price,productPicture,visible,discount,orders} = await request.json();

    try{
        //Authenticate User and Product are genuine by using AuthToken    

        const product = await Product.findById(productId);
        
        product.name = name;
        product.description = description;
        product.quantity = quantity;
        product.price = price;
        product.productPicture = productPicture;
        product.visible = visible;
        product.discount = discount;
        product.orders = orders;

        product.save();
        
        const response = NextResponse.json({
            msg:"Product is Updated",
            success:true
        })
        return response;
    }
    catch(error){
        const response = NextResponse.json({
            msg:"Product is not Updated",
            success:false
        })
        return response;
    }
}
