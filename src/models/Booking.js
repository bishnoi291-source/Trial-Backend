const bookings = [];

const createBooking = (bookingdata,user) => {
    const newbooking = {
        id: Date.now().toString(),
        userEmail:user.email,
        mallId: bookingdata.mallId,
        mallName: bookingdata.mallName,
        ProductName: bookingdata.ProductName,
        quantity: parseInt(bookingdata.quantity)||1,
        TotalPrice:parseFloat(bookingdata.TotalPrice)||0,
        date:new Date(),
        status:"Confirm"
    };
    bookings.push(newbooking);
    return newbooking;
}

const getBooking = (userEmail) => {
    return bookings.filter(b => b.userEmail === userEmail);
}

const getAllbookings = () => bookings;

module.exports = {
    createBooking,
    getBooking,
    getAllbookings
};