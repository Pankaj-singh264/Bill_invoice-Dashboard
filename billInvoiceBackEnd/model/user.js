const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
    // Company Info
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
    companyName: {
        type: String,
        required: true
    },
<<<<<<< HEAD
=======
    companyPhoneNo: {
        type: String,
        required: true
    },
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
<<<<<<< HEAD
    companyPhone: {
=======
    // Address Info
    billingAddress: {
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    // GST Info
    isGstRegistered: {
        type: Boolean,
        required: true,
        default: false
    },
    gstin: {
        type: String,
        required: function() {
            return this.isGstRegistered;
        }
    },
    panNumber: {
        type: String,
        required: true
    },
    enableEInvoice: {
        type: Boolean,
        default: false
    },
    // Login Info
    password: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    gstin: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
=======
    // Business Info
    businessType: {
        type: String,
        required: true
    },
    industryType: {
        type: String,
        required: true
    },
    businessRegistrationType: {
        type: String,
        required: true
    },
    // Terms and Signature
    termsAccepted: {
        type: Boolean,
        required: true,
        default: false
    },
    signature: {
        type: String
    },
    logo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Remove any existing email index to avoid conflicts
userSchema.index({ email: 1 }, { unique: false, sparse: true });

module.exports = mongoose.model('User', userSchema);
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
