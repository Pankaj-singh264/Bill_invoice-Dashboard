

// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./dataBase/db');
// const cors = require('cors');
// const userRoute = require('./routes/user');
// const itemRoute = require('./routes/item');
// // const invoiceRoutes = require('./routes/invoice');
// const addCustomerRoutes = require('./routes/addCustomerRoutes');
// const app = express();

// // Connect Database
// connectDB();

// // Middleware
// // app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // Routes
// app.use('/api/user', userRoute);
// app.use('/api/items', itemRoute);
// app.use('/api/customer', addCustomerRoutes);
// // app.use('/api/invoices', invoiceRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//     console.log(`Server running in mode on port ${PORT}`));




require('dotenv').config();
const express = require('express');
const connectDB = require('./dataBase/db');
const cors = require('cors');
const path = require('path');
const userRoute = require('./routes/user');
const itemRoute = require('./routes/item');
<<<<<<< HEAD
const invoiceRoutes = require('./routes/invoice');

const addCustomerRoutes = require('./routes/addCustomerRoutes');
=======
const addCustomerRoutes = require('./routes/addCustomerRoutes');
const inventoryItemRoute = require('./routes/inventoryItem')
const customerInvoiceRoutes = require('./routes/customerInvoice');
const invoiceRoute = require('./routes/invoice')
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
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
app.use('/api/items', itemRoute);
<<<<<<< HEAD
// app.use('/api/customer', addCustomerRoutes);
app.use('/api/invoices', invoiceRoutes);
=======
app.use('/api/customer', addCustomerRoutes);
app.use('/api/inventory', inventoryItemRoute);
app.use('/api/invoice', customerInvoiceRoutes);
app.use('/api/invoice', invoiceRoute);
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`));