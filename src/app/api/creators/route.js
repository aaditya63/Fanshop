import ConnectDB from "@/helper/db";
import { Creator } from "@/models/creator";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
ConnectDB();


//API to Create a User
export async function POST(request){
    const {name,email,password,gender,DOB} = await request.json();
    const newCreator = new Creator({
        name,email,password,gender,DOB,profilePicture:""
    });
    newCreator.about = "";
    newCreator.socials = {
        facebook:"",
        youtube:"",
        x:"",
        other:""
    }
    //<<<<<<<<<<<<<<<<Profile Picture is manually Sending..... It needs to be updated after an account,..
    //meanwhile show default avatars>>>>>>>>>>>>>>>>>>>>

    newCreator.password = bcrypt.hashSync(newCreator.password,parseInt(process.env.BCRYPT_SALT));

    try{
        newCreator.save();
        const response = NextResponse.json(newCreator,{            //<REMOVE no need to return : Before Deployment>
            message:"Account Created Successfully",
            success:true,
            status:201
        })
        return response;
    }catch(error){
        console.log("Unable to Register the User");
        const response = NextResponse.json({
            message:"Error Occured! User is not Created!",
            success:false,
            status:502    
        })
        return response;
    }
}