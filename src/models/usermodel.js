const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname,'../data/userlist.json');
// let Userdata = [];  //---in built array 

async function getuser(){
    const Users = await fs.promises.readFile(filepath,"utf8");
    return JSON.parse(Users);
};

async function adduser(User){
    const userarray = await getuser();
    userarray.push(User);
    await fs.promises.writeFile(filepath,JSON.stringify(userarray));
};

const register = async (data) =>{
    const Userdata = await getuser();
    const existinguser = Userdata.find(u => u.email === data.email);
    if(existinguser){
        return {success:false,message:"User already exist"};
    }
    const newuser = {
        name:data.name,
        email:data.email,
        password:data.password,
        joinedat:new Date()
    };
    await adduser(newuser);
    return {success:true,user:newuser};
};

const getuserprofile = async (email) => {
    const Userdata = await getuser();
    const user = Userdata.find(m => m.email === email);
    if(!user) return {success:false};
    const {password,...profile} = user
    return {success:true,user:profile};
};

module.exports = {
    register,
    getuserprofile
}
