const express = require('express');
const {registerUser, loginUser, logoutUser, getUser, updateUser, handleFileUploads, getImage} = require('../controllers/user');
const { protect } = require('../middleware/userAuth');
const upload = require('../middleware/fileUpload');
const path = require('path');
const fs = require('fs');
const User = require('../model/user');

const router = express.Router();

// Setup multer for file uploads
const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 }, 
  { name: 'signature', maxCount: 1 }
]);

// Routes
router.post('/register', uploadFields, registerUser);
router.post('/login', loginUser);
router.post('/logout/:id', logoutUser);
router.get('/profile', protect, getUser);
router.put('/update', protect, handleFileUploads, updateUser);

// Get user logo
router.get('/logos/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.logo) {
      return res.status(404).json({ message: 'Logo not found' });
    }

    // Get the logo file path
    console.log("process.cwd()", process.cwd())
    console.log("user.logo", user.logo)
    const logoPath = path.join(process.cwd(), user.logo);
    console.log("logoPath", logoPath)
    
    // Check if file exists
    if (!fs.existsSync(logoPath)) {
      return res.status(404).json({ message: 'Logo file not found' });
    }

    // Send the file
    res.sendFile(logoPath);
  } catch (error) {
    console.error('Error serving logo:', error);
    res.status(500).json({ message: 'Error serving logo' });
  }
});

module.exports = router;