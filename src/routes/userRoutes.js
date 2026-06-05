const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/usercontroller');
const { authenticateToken } = require('../middleware/authMiddleware');
router.get('/test',(req,res) => {
    res.json({
        success:true,
        message:"Working"
    });
});
router.post('/register',register);
router.post('/login',login);
router.get('/profile',authenticateToken,(req,res) => {
    res.json({
        success:true,
        message:"this is protected profile route",
        user:req.user
    });
});
module.exports = router;