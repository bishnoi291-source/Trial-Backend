const mongoose = require('mongoose');

// async function adduser(User){
//     const db = mongoutil.getdb();
//     await db.collection("users").insertOne(User);
// };

const userschema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    joinedate:String
});

module.exports = mongoose.model("users",userschema);

// const register = async (data) =>{
//     const db = mongoutil.getdb();
//     const existinguser = await db.collection("users").findOne({email:data.email});
//     if(existinguser){
//         return {success:false,message:"User already exist"};
//     }
//     const newuser = {
//         name:data.name,
//         email:data.email,
//         password:data.password,
//         joinedate:new Date()
//     };
//     await adduser(newuser);
//     return {success:true,user:newuser};
// };
// //____________________________________________
// //--------------LOGIN-------------------------
// const login = async(data) =>{
//     try{
//         const db = mongoutil.getdb();
//         const userdata = await db.collection("users").findOne({email:data.email,password:data.password});
//         if(!userdata){
//             return {success:false,message:"Please register yourself"};
//         }
//         return {success:true,message:"user found",user:userdata};
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal Server Error"
//         });
//     }
// };
// //____________________________________________
// //--------------PROFILE-----------------------
// const getuserprofile = async (email) => {
//     const db = mongoutil.getdb();
//     const user = await db.collection("users").findOne({email:email});
//     if(!user) return {success:false};
//     const {password,...profile} = user
//     return {success:true,user:profile};
// };

// module.exports = {
//     register,
//     login,
//     getuserprofile
// };
