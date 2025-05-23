require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./dataBase/db');
const userRoutes = require('./routes/user');
const invoiceRoutes = require('./routes/invoice');
const customerRoutes = require('./routes/addCustomerRoutes');
const inventoryRoutes = require('./routes/inventoryItem');
// const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory', inventoryRoutes);

// app.use('/api/payment', paymentRoutes);

// Connect to database
connectToDB();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});