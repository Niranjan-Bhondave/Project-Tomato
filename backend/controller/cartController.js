import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async(req,res) =>{
    try
    {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId])cartData[req.body.itemId] = 1;
        else cartData[req.body.itemId] += 1;

        await userModel.findByIdAndUpdate({_id: req.body.userId},{cartData: cartData});
        res.json({success: true, message: "Item added to cart"});
    }
    
catch(error) {
    res.json({success: false, message: "Error in adding item to cart"});
}
}

//remove items from user cart
const removeFromCart = async(req,res) =>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId])cartData[req.body.itemId] -= 1;
        await userModel.findByIdAndUpdate({_id: req.body.userId},{cartData: cartData});
        res.json({success: true, message: "Item removed from cart"});
    }

    catch(error){
        res.json({success: false, message: "Error in removing item from cart"});
    }
}

//get all items in user cart
const getCart = async(req,res) =>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({success: true, message: "Cart data retrieved", cartData: cartData});
        
    }

    catch{
        res.json({success: false, message: "Error in retrieving cart data"});
    }
}

export {addToCart, removeFromCart, getCart}