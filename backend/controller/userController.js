import userModel from  '../models/userModels.js'
import {jwt} from 'jsonwebtoken'
import {bcrypt} from 'bcrypt'
import {validator} from 'validator'


const loginUser = async(req,res) =>{
    
}

const registerUser = async(req,res) =>{
    const {name, password, email} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            res.json({success: false, message: "User already exists"})
        }

        if(!validator.isEmail(email)){
            res.json({success: false, message: "Invalid email"})
        }

        if(password.length < 8)
        {
            res.json({success: false, message: "Please enter strong password"})
        }

        const 
    }
}

export {loginUser,registerUser};