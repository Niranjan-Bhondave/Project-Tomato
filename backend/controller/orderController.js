import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing order
const fronendUrl = "http://localhost:5173";

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency: "inr",
            product_data:{name:item.name},
            unit_amount: item.price*100*50

            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
            product_data:{name:"Delivery Charge"},
            unit_amount: 2*100*50
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${fronendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${fronendUrl}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({success: true, session_url: session.url});
    }

    catch(error){
        console.log(error);
        res.json({success: false, message: "Something went wrong"});
    }
};

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Order placed successfully"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Order failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Something went wrong"});
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Something went wrong"});
    }
}

export {placeOrder,verifyOrder};