const express = require('express');
const router = express.Router();
const {addMall, getMalls, getMall,updatemall,deletemall,searchMall} = require('../controllers/mallcontroller');
const {authenticateToken} = require('../middleware/authMiddleware');
const { searchMallsByRating } = require('../models/Mall');
router.get('/',getMalls);
router.get('/search',searchMall); //---modify it.
router.get('/:id',getMall);
router.post('/',authenticateToken,addMall);
router.put('/:id',authenticateToken,updatemall);
router.delete('/:id',authenticateToken,deletemall);
module.exports = router;