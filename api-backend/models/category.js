const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'enabled'
    },
    added_by: {
        type: Object,
        required: true
    },
    created_on: {
        type : Date,
        default: Date.now
    }
})

const Category = mongoose.model("categories", categorySchema);


function validateCategory(category) {
    const schema= Joi.object({
        name: Joi.string().min(2).max(50).required(),
        status: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(category, {abortEarly: false});
}

exports.Category = Category;
exports.validate = validateCategory;
