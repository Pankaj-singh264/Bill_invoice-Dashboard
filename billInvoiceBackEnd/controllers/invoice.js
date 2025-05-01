// const 

// const createInvoice = async (req, res) => {
//     const {
//         customer,
//         items
//     } = req.body;

//     // Calculate totals
//     let subtotal = 0;
//     let totalGST = 0;
//     const invoiceItems = [];

//     for (const item of items) {
//         const dbItem = await Item.findById(item.item).populate('user');
//         if (!dbItem) {
//             res.status(404);
//             throw new Error('Item not found');
//         }

//         const itemTotal = dbItem.price * item.quantity;
//         const itemGST = itemTotal * (dbItem.gstRate / 100);

//         subtotal += itemTotal;
//         totalGST += itemGST;

//         invoiceItems.push({
//             item: dbItem._id,
//             quantity: item.quantity,
//             price: dbItem.price,
//             gstRate: dbItem.gstRate
//         });
//     }

//     const grandTotal = subtotal + totalGST;

//     const invoice = await Invoice.create({
//         user: req.user._id,
//         invoiceNumber: `INV-${Date.now()}`,
//         customer,
//         items: invoiceItems,
//         subtotal,
//         totalGST,
//         grandTotal
//     });

//     res.status(201).json(invoice);
// };


// const getGSTSummary = async (req, res) => {
//     const invoices = await Invoice.find({
//         user: req.user._id
//     }).populate('items.item');

//     const gstSummary = invoices.reduce((acc, invoice) => {
//         invoice.items.forEach(item => {
//             const rate = item.gstRate;
//             const amount = item.price * item.quantity * (rate / 100);
//             acc[rate] = (acc[rate] || 0) + amount;
//         });
//         return acc;
//     }, {});

//     res.json(gstSummary);
// };

// module.exports = {
//     createInvoice,
//     getGSTSummary
// };