require('dotenv').config();
const express = require('express');
const connectDB = require('./dataBase/db');
const cors = require('cors');
const path = require('path');
const userRoute = require('./routes/user');
const itemRoute = require('./routes/item');
const addCustomerRoutes = require('./routes/addCustomerRoutes');
const inventoryItemRoute = require('./routes/inventoryItem');
const invoiceRoutes = require('./routes/invoice');
// const paymentRouter = require('./routes/payment.js')
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create upload directories if they don't exist
/* This code snippet is creating directories for uploading files if they don't already exist. */
const fs = require('fs');
const uploadDirs = ['uploads', 'uploads/logos', 'uploads/signatures'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Routes
app.use('/api/user', userRoute);
app.use('/api/customers', addCustomerRoutes);
app.use('/api/items', itemRoute);
app.use('/api/inventory', inventoryItemRoute);
app.use('/api/invoices', invoiceRoutes);
// app.use('/api/payment', paymentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`));