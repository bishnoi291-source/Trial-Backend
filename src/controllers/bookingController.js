const Booking = require('../models/Booking');

const createBooking = (req,res) => {
    try{
        const{mallId,mallName,ProductName,quantity,TotalPrice} = req.body;
        if(!mallId || !ProductName){
            return res.status(400).json({
                success:false,
                message:"Mall ID and Product Name are required"
            });
        }
        const newBooking = Booking.createBooking(req.body,req.user);
        res.json({
            success:true,
            message:"Booking created successfully",
            data:newBooking
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    } 
};

const getMybooking = (req,res) => {
    const booking = Booking.getBooking(req.user.email);
    res.json({
        success:true,
        count:booking.length,
        data:booking
    });
}

module.exports = {
    createBooking,
    getMybooking
}