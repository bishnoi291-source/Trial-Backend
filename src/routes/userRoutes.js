const express = require('express');
const router = express.Router();
const {register,login,getprofile} = require('../controllers/usercontroller');
const { authenticateToken } = require('../middleware/authMiddleware');
router.get('/test',(req,res) => {
    res.json({
        success:true,
        message:"Working"
    });
});
router.post('/register',register);
router.post('/login',login);
router.get('/profile',authenticateToken,getprofile);
module.exports = router;