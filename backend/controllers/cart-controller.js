import UserModel from "../models/UserSchema.js";

const addToCart = async (req, res) => {
    try{
        let userData = await UserModel.findOne({_id : req.body.userId});
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await UserModel.findByIdAndUpdate(req.body.userId, {cartData}); //{cartData : cartData} to add into that empty object
        res.status(200).json({
            success : true,
            message : "Item added to cart successfully"
        })
    } catch (error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error adding to cart"
        })
    }
}

const removeFromCart = async (req, res) => {    
    try{
        let userData = await UserModel.findById(req.body.userId); // another method to use instead of findone
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({
            success : true,
            message : "Item removed from cart successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error removing from cart"
        })
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.status(200).json({
            success : true,
            cartData
        })
    } catch (error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error getting cart"
        })
        
    }
}

export { addToCart, removeFromCart, getCart };