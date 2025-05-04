

require('dotenv').config();
const express = require('express');
const connectDB = require('./dataBase/db');
const cors = require('cors');
const userRoute = require('./routes/user');
const itemRoute = require('./routes/item');
const invoiceRoutes = require('./routes/invoice');

const addCustomerRoutes = require('./routes/addCustomerRoutes');
const app = express();

// Connect Database
connectDB();

// Middleware
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/user', userRoute);
app.use('/api/items', itemRoute);
// app.use('/api/customer', addCustomerRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running in mode on port ${PORT}`));