const {Category, validate} = require('../models/category');
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');

// Get Categories
router.get('/', authentication, async (req, res) => {
    
    let category = await Category.find();
    
    res.json({
        "success": true,
        "data": category
    });
});


// Get Category
router.get('/:id', authentication, async (req, res) => {
    
    let category = await Category.findOne({_id: req.params.id});
    
    res.json({
        "success": true,
        "data": category
    });
});


// Add Categories
router.post('/', authentication, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.json({
        "success": false,
        "errors": error.details,
    });
    
    let category = await Category.findOne({name: req.body.name});
    if(category) {
        return res.json({
            "success": false,
            "message": "Category already exists",
        });
    }

    category = new Category({
        name: req.body.name,
        status: req.body.status,
        added_by: req.user._id,
    });

    await category.save();
    
    res.json({
        "success": true,
        "message": "Category added successfully"
    });
});


// Update Categories
router.put('/:id', authentication, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.json({
        "success": false,
        "errors": error.details,
    });
    
    let category = await Category.findOne({_id: Object(req.params.id) });
    
    if(!category) {
        return res.json({
            "success": false,
            "message": "Category not exists",
        });
    }
    let query = { _id: Object(req.params.id) };
    category['name'] = req.body.name;
    category['status'] = req.body.status;
    delete category['_id'];
    delete category['added_on'];
    await Category.updateOne(query, category);

    res.json({
        "success": true,
        "message": "Category updated successfully"
    });
});


// Delete Categories
router.delete('/:id', authentication, async (req, res) => {
    
    let category = await Category.findOne({_id: Object(req.params.id) });
    
    if(!category) {
        return res.json({
            "success": false,
            "message": "Category not exists",
        });
    }
    let query = { _id: Object(req.params.id) };
    await Category.deleteOne(query);

    res.json({
        "success": true,
        "message": "Category deleted successfully"
    });
});


module.exports = router;
