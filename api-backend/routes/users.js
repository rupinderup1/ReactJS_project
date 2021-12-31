const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

// Register User
router.post('/', upload.none(), async (req, res) => {
    res.header("Access-Control-Allow-Origin", "true");
    const {error} = validate(req.body);
    if(error) return res.json({
        "success": false,
        "errors": error.details,
    });
    
    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.json({
            "success": false,
            "message": "user already registered",
        });
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.json({
        "success": true,
        "message": "User Registed Successfully!",
        "token": token
    });
});


module.exports = router;
