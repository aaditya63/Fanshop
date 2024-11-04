import ConnectDB from "@/helper/db";
import { Order } from "@/models/order";
import { NextResponse } from "next/server";

ConnectDB();

export async function PUT(request,{params}){
    const {customerId,orderId} = await params;

    try{
        //Authenticate order and User
        const order = await Order.findById(orderId);
        order.orderStatus = "cancelled";
        order.save();
        const response = NextResponse.json({
            msg:"Order Cancelled Successfully",
            success:true
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            msg:"Order not Cancelled",
            success:false
        })
    }
}