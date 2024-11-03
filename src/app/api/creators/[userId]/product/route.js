import ConnectDB from "@/helper/db";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

ConnectDB();

//API to Add Product
export async function POST(request,{params}){
    const {name,description,quantity,price} = await request.json();

    console.log("passed values are : ",description)
    const {userId} = params;
    const newproduct = new Product({
        name,description,ownedByUser:userId,quantity,price,productPicture:""
    });
    newproduct.visible = true;
    newproduct.discount = [];
    newproduct.orders = [];

    //Validate User is authenticated with the same Token
    try{
        await newproduct.save();
        const response = NextResponse.json(newproduct,{
            message:"Product is Created",
            success:true
        })
        return response;
    }
    catch(error){
        const response = NextResponse.json({
            message:"Product is not created",
            success:false
        })
        return response;
    }
}

//API to Fetch All Products of a Creator
export async function GET(request,{params}){
    const {userId} = await params;
    try{
        //Authenticate userID with Authenticated UserId with Token
        const products = await Product.find({ownedByUser:userId})

        const response = NextResponse.json(products,{
            msg:"Products fetched successfully",
            success:true
        })
        return response;

    }catch(error){
        const response = NextResponse.json({
            msg:"Products not fetched",
            success:false
        })
        return response;
    }
}