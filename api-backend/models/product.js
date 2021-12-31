const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: Object,
        requried:true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    featuredImage: {
        type: String,
        required: true,
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

const Product = mongoose.model("products", productSchema);


function validateProduct(product) {
    const schema= Joi.object({
        categoryId: Joi.string().min(2).max(50).required(),
        name: Joi.string().min(2).max(50).required(),
        status: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(product, {abortEarly: false});
}

exports.Product = Product;
exports.validate = validateProduct;
