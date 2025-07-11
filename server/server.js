// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const clinicRoutes = require('./routes/clinics');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: ['https://kennect-assessment.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use('/clinics', clinicRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
