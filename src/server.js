require('dotenv').config();
const express = require('express'); 
const cors = require('cors');        
const helmet = require('helmet');       
const morgan = require('morgan');     
const path = require('path');
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const mallRoutes = require('./routes/mallRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/malls',mallRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings',bookingRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./','views','home.html'));
});
//register______________________________
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'./','views','register.html'));
});

//login________________________________
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
app.listen(PORT, () => {
    console.log(`Server URL: http://localhost:${PORT}`);
});