import userModel from  '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.JWT_SECRET);
}


const loginUser = async(req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.json({success: false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)return res.json({success: false, message: "Invalid credentials"});

        const token = createToken(user._id);
        res.json({success: true, token});
    }

    catch(error){
        console.log(error);
        return res.json({success: false, message: "Error encountered"});
    }
}

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // Check password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Save new user and generate token
        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.json({ success: false, message: "Error encountered" });
    }
}


export {loginUser,registerUser};