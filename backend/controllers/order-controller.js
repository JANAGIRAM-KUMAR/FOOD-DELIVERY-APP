import dotenv from "dotenv";
import OrderModel from "../models/OrderSchema.js";
import UserModel from "../models/UserSchema.js";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing user order from frontend

const placeOrder = async (req,res) => {

    const frontend_url = 'http://localhost:5173';

    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData : {}});

        const line_items = req.body.items.map((item)=> ({
            price_data : {
                currency : "inr",
                product_data : {
                    name : item.name
                },
                unit_amount : item.price * 100
            },
            quantity : item.quantity
        }));
        
        line_items.push({
            price_data : {
                currency : "inr",
                product_data : {
                    name : "Delivery Charges"
                },
                unit_amount : 3900
            },
            quantity : 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.status(200).json({
            success : true,
            session_url : session.url
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error placing order"
        })
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if(success === "true"){
            await OrderModel.findByIdAndUpdate(orderId, {payment : true});
            res.status(200).json({
                success : true,
                message : "Order placed successfully"
            })
        } else {
            await OrderModel.findByIdAndDelete(orderId);
            res.status(200).json({
                success : true,
                message : "Order cancelled"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error verifying order"
        })
    }
}

const userOrders = async (req,res) => {
    try {
        const orders = await OrderModel.find({userId : req.body.userId});
        res.status(200).json({
            success : true,
            data: orders
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success : false,
            message : "Error getting user orders"
        })
    }
}

const listAllOrders = async (req,res) => {
    try {
        const orders = await OrderModel.find({});
        res.status(200).json({
            success : true,
            data: orders
        })
    } catch (error){
        res.status(500).json({
            success : false,
            message : "Error listing all orders"
        })
    }
}

// API for updating status

const updateStatus = async (req,res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId, {status : req.body.status});
        res.status(200).json({
            success : true,
            message : "Status updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error updating status"
        })
    }
}


export {placeOrder, verifyOrder, userOrders, listAllOrders, updateStatus};