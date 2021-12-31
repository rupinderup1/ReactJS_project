const {Product, validate} = require('../models/product');
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');
const uploadFile = require("../middleware/upload");

// Get Products
router.get('/', authentication, async (req, res) => {
    
    let product = await Product.find();
    
    res.json({
        "success": true,
        "data": product
    });
});


// Add Products
router.post('/', authentication, async (req, res) => {
    try {
        await uploadFile(req, res);
    
        if (req.file === undefined) {
            return res.json({
                "success": false,
                "message": "Please upload a file!",
            });
        }
        
        const {error} = validate(req.body);
        if(error) return res.json({
            "success": false,
            "errors": error.details,
        });
        
        let product = await Product.findOne({name: req.body.name});
        if(product) {
            return res.json({
                "success": false,
                "message": "Product already exists",
            });
        }
        
        product = new Product({
            categoryId: req.body.categoryId,
            name: req.body.name,
            featuredImage: req.file.filename,
            status: req.body.status,
            added_by: req.user._id,
        });
        
        await product.save();
        
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
