const express = require('express');
const router = express.Router();
const {createBooking,getMybooking} = require('../controllers/bookingController');
const {authenticateToken} = require('../middleware/authMiddleware');

router.post('/',authenticateToken,createBooking);
router.get('/my-bookings',authenticateToken,getMybooking);

module.exports = router;