import mongoose from "mongoose";
import FoodModel from "../models/FoodSchema.js";
import fs from "fs";

//addFood

const addFood = async (req,res) => {
    
    let image_filename = `${req.file.filename}`;

    const food = new FoodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        image : image_filename,
        category : req.body.category,
        rating : req.body.rating
    })

    try {
        await food.save();
        res.status(200).json({
            success : true,
            message : "Food added successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error adding in food"
        })
    }
}

//list all foods

const listAllFoods = async (req,res) => {
    try {
        const foods = await FoodModel.find({});
        res.status(200).json({
            success : true,
            data : foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error listing all foods"
        })
    }
}

const removeFood = async (req,res) => {
    try {
        const food = await FoodModel.findById(req.body.id);
        fs.unlinkSync(`uploads/${food.image}`,()=> {});

        await FoodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({
            success : true,
            message : "Food deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error deleting food"
        })
    }
}

export {addFood, listAllFoods, removeFood}