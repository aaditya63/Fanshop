import { Creator } from "@/models/creator";
import { NextResponse } from "next/server";

const { default: ConnectDB } = require("@/helper/db");

ConnectDB();

//API to Delete a Creator
export async function DELETE(request,{params}){
    const {userId} = await params;

    try{
        await Creator.findByIdAndDelete(userId);

        const response = NextResponse.json({
            msg:"Creator is Deleted Successfully",
            success:true
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            msg:"Creator is not Deleted Successfully",
            success:false
        })
        return response;
    }
}

//API to update a Creator info
export async function PUT(request,{params}){
    const {name,email,password,gender,DOB,profilePicture,about,socials} = await request.json();
    const {userId} = await params;

    try{
        const creator = await Creator.findById(userId);
        creator.name = name;
        creator.email = email;
        creator.password = password;
        creator.gender = gender;
        creator.DOB = DOB;
        creator.profilePicture = profilePicture;
        creator.about = about;
        creator.socials = socials;

        creator.save();

        const response = NextResponse.json({
            msg:"Creator is Successfully Updated!",
            success:true
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            msg:"Creator is not Successfully Updated!",
            success:false
        })
        return response;
    }
}