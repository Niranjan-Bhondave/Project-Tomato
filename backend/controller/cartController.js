import userModel from '../models/userModel.js'


//add itms to user cart
const addToCart = async(req,res)=> {
    try 
    {
        let userData = await userModel.findOne({_id: req.body._id});
        let cartData = await userData.cartData;

        if(!cartData[req.body._id]){
            cartData[req.body._id] = 1;
        }

        else cartData[req.body._id] += 1;
        
        await userModel.findByIdAndUpdate(req.body._id, {cartData});
        res.json({success: true, message: "Item added to cart"});
    } 
    
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Internal server error"});    
    }
}

//remove items from user cart
const removeFromCart = async(req,res)=>{

}

//get items from user cart
const getCart = async(req,res)=>{

}

export {addToCart, removeFromCart, getCart};