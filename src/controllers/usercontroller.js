const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = (req, res) => {
    try{
        const{name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter your info properly"
            });
        }
        res.status(201).json({
           success:true,
           message:"Registration is successfull",
           user:{
                name:name,
                email:email,
           }
        });
    }
    catch(error){
        res.status(501).json({
            success:false,
            message:"Internal error"
        });
    }
};

const login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        console.log("JWT_SECRET from env:", process.env.JWT_SECRET); // Debugging line

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

module.exports = {register,login};