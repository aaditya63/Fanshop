import ConnectDB from "@/helper/db";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

ConnectDB();

//API to create Order
export async function POST(request,{params}){
    const {customerId} = await params;
    const {productId,quantity,discountCode} = await request.json();

    try{

        //Authenticate User
        const product = await Product.findById(productId);
        const neworder = new Order({
            name:product.name,
            productId:product._id,
            description:product.description,
            customer:customerId,
            creator:product.ownedByUser,
            quantity:quantity,
            price:product.price,
            discountedPrice:product.price,
            discount:{
                code:"",
                value:0
            },
            profilePicture:product.profilePicture,
            orderStatus:"pending"
        });

        let gotDiscount = false;

        if(product.visible == false){
            const response = NextResponse.json({
                msg : "Product is not Available",
                success : false
            })
            return response;
        }
        else if(product.quantity < quantity){
            const response = NextResponse.json({
                msg : `${quantity} is not available,. Reduce your Cart and Try Again`,
                success : false
            })
            return response;
        }

        else if(discountCode != 0){                     //Pass 0 if Discount is not being used
            const check = product.discount;
            for(let i of check){
                if(i.code == discountCode && i.available >= quantity){
                    gotDiscount = true;
                    neworder.discountedPrice = (neworder.price/100) * (100 - i.value);
                    neworder.discount.code = i.code;
                    neworder.discount.value = i.value;
                    break;
                }
            }
            if(!gotDiscount){
                const response = NextResponse.json({
                    msg : "Invalid Code",
                    success : false
                })
                return response;
            }
        }

        product.quantity -= quantity;

        for(let i=0;i<product.discount.length;i++){
            if(product.discount[i].code == neworder.discount.code){
                product.discount[i].available -= quantity;
            }
        }
        product.save();
        neworder.save();

        const response = NextResponse.json({
            msg : "Order is Created",
            success : true
        })
        return response;

    }catch(error){
        const response = NextResponse.json({
            msg : "Order is not Created",
            success : false
        })
        return response;
    }
}

//Api to Fetch all Orders of a user
export async function GET(request,{params}){
    const {customerId} = await params;

    try{
        const orders = await Order.find({customer:customerId})
        const response = NextResponse.json(orders,{
            msg : "Orders History are",
            success : true
        })
        return response;
    }catch(error){
        const response = NextResponse.json({
            msg : "Orders History is not fetched",
            success : false
        })
        return response;
    }
}


//API to Check & Validate Discount Code
export async function PUT(request,{params}){
    const {customerId} = await params;
    const {productId,discountCode,quantity} = await request.json();
    try{
        const product = await Product.findById(productId);

        let gotDiscount = false;

        let discountedPrice = product.price;
        let discountedvalue = 0;

        const check = product.discount;

        for(let i of check){
            if(i.code == discountCode){
                gotDiscount = true;
                discountedPrice = (product.price/100) * (100 - i.value);
                discountedvalue = i.value;
            }
            if(i.available < quantity && gotDiscount){
                const response = NextResponse.json({
                    gotDiscount : true,
                    msg:`Discount Coupon can be applied at max ${i.available} quantity`,
                    discountvalue : 0,
                    discountedPrice : product.price,
                    success : true
                })
                return response;
            }
            break;
        }

        if(gotDiscount){
            const response = NextResponse.json({
                gotDiscount : true,
                msg:"Discount Coupon Applied",
                discountvalue : discountedvalue,
                discountedPrice : discountedPrice,
                success : true
            })
            return response;
        }
        else{
            const response = NextResponse.json({
                gotDiscount : false,
                msg:"Discount Coupon is Invalid",
                discountvalue : discountedvalue,
                success : true
            })
            return response;
        }
    }catch(error){
        console.log(error);
        const response = NextResponse.json({
            msg:"Error Occured while checking Discounts",
            success : false
        })
        return response;
    }
}