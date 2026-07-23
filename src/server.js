require('dotenv').config();
const express = require('express');
const cors = require('cors');    
const helmet = require('helmet');      
const morgan = require('morgan');    
const path = require('path');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
//------------------------------------------
const userRoutes = require('./routes/userRoutes');
const mallRoutes = require('./routes/mallRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// const mongoutil = require('./utils/database');
//---------------------------------------------
app.use('/api/malls',mallRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings',bookingRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./','views','home.html'));
});

//register_____________________________________________________________
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'./','views','register.html'));
});

//login________________________________________________________________
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'./','views','login.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ success: true, status: "OK", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Error 404 (NOT FOUND)" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://trial:manish29@trial.ktraj12.mongodb.net/trial?appName=trial").then(() => {
    console.log(`database connected`);
    app.listen(PORT, () => {
    console.log(`Server URL :http://localhost:${PORT}`);
    });
})
.catch((err) => {
console.log(`Error Occured`);
});
