const {Product, validate} = require('../models/product');
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');
const uploadFile = require("../middleware/upload");
var os = require('os');
const multer  = require('multer');
const upload = multer({ dest: "/" });

// Get Products
router.get('/', authentication, async (req, res) => {
    
    let product = await Product.find();
    
    res.json({
        "success": true,
        "data": product
    });
});


// Add Products
router.post('/', [authentication, upload.single('featuredImage')], async (req, res) => {
    try {
        console.log(req.file, req.body)
        
        res.json({
            "success": true,
            "message": "Product added successfully"
        });
        
    } catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": `Could not upload the file: ${req.file.originalname}. ${err}`
        });
    }
});

module.exports = router;
