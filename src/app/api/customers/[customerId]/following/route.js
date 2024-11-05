import ConnectDB from "@/helper/db";
import { Creator } from "@/models/creator";
import { Customer } from "@/models/customer";
import { Follower } from "@/models/follower";
import { Following } from "@/models/following";
import { NextResponse } from "next/server";

ConnectDB();

//API to follow a Creator
export async function POST(request,{params}){
    const {customerId} =  await params;
    const {creatorId} = await request.json();

    try{
        const following = await Following.find({customer:customerId});
        const follower = await Follower.findById(creatorId);
        const customer = await Customer.findById(customerId);
        const creator = await Creator.findById(creatorId);
        
        if(!following){
            const newfollowing = new Following({
                name:customer.name,
                customer:customer._id
            })
            newfollowing.follow = [
                {
                    name:creator.name,
                    creatorId:creator._id,
                    profilePicture:creator.profilePicture
                }
            ];
            newfollowing.followCount = 1;
            await newfollowing.save();
        }
        else{
            // let data = {
            //     name:creator.name,
            //     creatorId:creator._id,
            //     profilePicture:creator.profilePicture
            // };
            // following.follow.push(data);
            // following.followCount =+ 1;
            // following.save();
        }

        if(!follower){
            const newfollower = new Follower({
                name:creator.name,
                creator:creator._id,
                followerCount:0
            })
            newfollower.followCount +=1;
            await newfollower.save();
        }
        else{
            follower.followCount +=1;
            await follower.save();
        }

        const response = NextResponse.json({
            msg:"Creator Followed Successfully",
            success:true
        })
        return response;
    }catch(error){
        console.log(error);
        const response = NextResponse.json({
            msg:"Creator not Followed",
            success:false
        })
        return response;
    }
}