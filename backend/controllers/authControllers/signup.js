const bcrypt=require('bcryptjs');
const User=require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// signup
exports.register = async(req,res) =>{
    try{
        const {name,email,password,date_of_birth} = req.body;

        // fill required details
        if(!email || !password || !name) {
            return res.status(499).json({
                success:false,
                message:"Please fill all the required field."
            })
        }

        // check for the existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:true,
                message:"user already exist !! please login"
            })
        }

        // hash the password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }catch(err){
            res.status(500).json({
                success:false,
                message:"error in hashing password"
            })
        }

        // create user
        const newUser= await User.create({
            name,
            email,
            password:hashedPassword,
            date_of_birth,
        });

        return res.status(200).json({
            success:true,
            message:"user registred successfully."
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"user registration failed."
        })
    }
}