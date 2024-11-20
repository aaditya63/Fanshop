import ConnectDB from "@/helper/db";
import { Customer } from "@/models/customer";
import { NextResponse } from "next/server";

ConnectDB();

//API is to Update User Profile
export async function PUT(request,{params}){
    const {customerId} = params
    const {name,email,password,gender,DOB,profilePicture} = await request.json();

    //<AUTHentication needed>
    try{
        const customer = await Customer.findById(customerId);
        customer.name = name;
        customer.email = email;
        customer.password = password;
        customer.gender = gender;
        customer.DOB = DOB;
        customer.profilePicture = profilePicture;

        customer.save();

        const response = NextResponse.json({
            message:"User Data Updated Successfully",
            status:201
        })
        //<< Also UPDATE IN CONTEXT API, REDUX, FOR INSTANT CHANGE IN DASHBOARD>>
        return response;
    }catch(error){
        const response = NextResponse.json({
            message:"User Data is not updated",
            status:501
        })
        return response;
    }
}


//API is to Delete the Customer Account
export async function DELETE(request,{params}){
    const {customerId} = params;
    
    //<Veryify Authentication> and customerId as well PLUS User needs to again Enter a Password
    try{
        await Customer.findByIdAndDelete(customerId);
        const response = NextResponse.json({
            message:"User Deleted Successfully",
            status:201
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            message:"User is not Deleted",
            status:501
        })
        return response;
    }
}


//API to Validate Discounts
