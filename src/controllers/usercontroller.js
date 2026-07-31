const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const usermodel = require('../models/usermodel');

const register = [

    check("name")
    .notEmpty().withMessage("Please Enter Your Sweat Name")
    .trim()
    .isLength({min:2}).withMessage("Lenght is small")
    .matches(/[A-Za-z]/).withMessage("Please Use Only Alphabets"),

    check("email")
    .isEmail().withMessage("Please Enter a Valid Email")
    .normalizeEmail(),

    check("password")
    .notEmpty().withMessage("Please enter your password")
    .isLength({min:8}).withMessage("Password must 8 contain characters"),

    async (req, res) => {
    try{
        const{name,email,password} = req.body;
        const error = validationResult(req);
        if(!error.isEmpty()){
            console.log(error);
            return res.status(400).json({
                success:false,
                err: error.message
            });
        }
        const newuser = await usermodel.findOne({email});
        if(newuser){
            return res.status(400).json({
                message:"User already Exist"
            });
        }
        const hashedpassword = await bcrypt.hash(password,12);
        const user = new usermodel({name,email,password:hashedpassword});
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
}];

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const result = await usermodel.findOne({ email});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Invalid User"
            });
        }
        const ismatch = await bcrypt.compare(password,result.password);

        if(!ismatch){
            
            return res.status(400).json({
                success:false,
                message:"Invalid Inputs"
            });
        }

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