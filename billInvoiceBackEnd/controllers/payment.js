const paymentModel = require('../model/payment')
const Razorpay = require('razorpay')


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});



const Orders = async(req, res) => {
    const {
        amountPaid
    } = req.body;

    try {
        const options = {
            amount: Number(amountPaid),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Something Went Wrong!"
                });
            }
            res.status(200).json({
                data: order
            });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        });
        console.log(error);
    }
}
const verifyOrders = async(req,res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    // console.log("req.body", req.body);

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new paymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        });
        console.log(error);
    }
}


module.exports = {
    Orders,
    verifyOrders
}