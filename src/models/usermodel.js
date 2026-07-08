let Userdata = [];

const register = (data) =>{
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
    Userdata.push(newuser);
    return {success:true,user:newuser};
};

const getuserprofile = (email) => {
    const user = Userdata.find(m => m.email === email);
    if(!user) return null;
    const {password,...profile} = user
    return profile;
};

module.exports = {
    register,
    getuserprofile
}
