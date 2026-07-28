const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const register = async (req, res) => {
    try{
        const{name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter your info properly"
            });
        }
        const newuser = await usermodel.findOne({email});
        if(newuser){
            return res.status(400).json({
                message:"User already Exist"
            });
        }
       const user = new usermodel({name,email,password});
       await user.save();
        res.status(201).json({
           success:true,
           message:"Registration is successfull",
           data:user
        });
    }
    catch(error){
        console.log("error->",error.message);
        res.status(500).json({
            success:false,
            message:"Internal error "
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }
        const result = await usermodel.findOne({ email, password });
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Invalid User"
            });
        }
        // console.log("JWT_SECRET from env:", process.env.JWT_SECRET); // Debugging line

        if (!process.env.JWT_SECRET) {
            console.error("ERROR: JWT_SECRET is missing or empty!");
            return res.status(500).json({
                success: false,
                message: "Server configuration error - JWT_SECRET not found"
            });
        }

        const token = jwt.sign(
            { email: email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: "Login successful",
            token: token,
            user: { email: email }
        });

    } catch (error) {
        console.error("Login Error Details:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getprofile = async (req,res) => {
    try{
        console.log("req.user:", req.user);
        const profile = await usermodel.findOne({email:req.user.email});
        if(!profile){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            });
        }
        res.status(200).json({
            data:profile
        });
    }
    catch(error){
        console.error("Profile Error:", error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Error profile"
        });
    }
};

module.exports = {register,login,getprofile};