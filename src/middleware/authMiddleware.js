const jwt = require('jsonwebtoken');
const authenticateToken = (req,res,next) => {
    try {
        const authHeader = req.headers['authorisation'];
        // const token = authHeader && authHeader.split(" ")[1];
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"please Login"
            });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch(error){
        return res.status(403).json({
            success:false,
            message:"INvalid Token, Please Login again"
        })
    }
};
module.exports = {authenticateToken};