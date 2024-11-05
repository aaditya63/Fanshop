
import ConnectDB from "@/helper/db";
import { Order } from "@/models/order";
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";
import { NextResponse } from "next/server";

ConnectDB();

//API to Fetch All Orders
export async function GET(request,{params}){
    const {userId} = await params;

    try{
        const orders = await Order.find({creator:userId});

        const response = NextResponse.json(orders,{
            msg:"Orders Fetched Successfully",
            success:true
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            msg:"Failed to Fetch Orders",
            success:false
        })
        return response;
    }
}


//API to Fetch Orders of Selected Product Only!
export async function POST(request,{params}){
    const {userId} = await params;
    const {productId} = await request.json();
    try{
        const orders = await Order.find({creator:userId,productId:productId});

        const response = NextResponse.json(orders,{
            msg:"Orders Fetched Successfully",
            success:true
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            msg:"Failed to Fetch Orders",
            success:false
        })
        return response;
    }
}

//API to Perform Action on Order
export async function PUT(request,{params}){
    const {userId} = await params;
    const {orderId,status} = await request.json();

    try{
        //validate that Order Id is belongs to the same Creator

        const order = await Order.findById(orderId);
        order.orderStatus = status;
        order.save();

        if(status == "complete"){
            const response = NextResponse.json({
                msg:"Order Completed Successfully",
                success : true
            })
            return response;
        }
        else{
            const response = NextResponse.json({
                msg:"Order Rejected Successfully",
                success : true
            })
            return response;
        }
    }catch(error){
        const response = NextResponse.json({
            msg:"Order not updated!!",
            success : false
        })
        return response;
    }
}