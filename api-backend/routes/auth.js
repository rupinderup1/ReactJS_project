const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.post('/', upload.none(), async (req, res) => {
    const {error} = validate(req.body);
    
    if(error) return res.json({
        "success": false,
        "message": "Please Fill all requried fields",
        "errors": error.details,
    });
    
    let user = await User.findOne({email: req.body.email});
    
    if(!user) {
        return res.json({
            "success": false,
            "message": "Invalid email or password",
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.json({
            "success": false,
            "message": "Invalid email or password",
        });
    }
    const token = user.generateAuthToken();
    
    res.status(200);
    res.json({
        "success": true,
        "message": "Logged In Successfully!",
        "token": token
    });
});

function validate(req) {
    const schema= Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req, {abortEarly: false});
}

module.exports = router;
