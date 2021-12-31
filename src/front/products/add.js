import React from "react";
import Joi from "joi";
import fs from 'fs';
import FormData from 'form-data';
import Form from "../components/common/form";
import ProductsServices from "../services/productsServices";
import CategoriesServices from "../services/categoriesServices";

class Add extends Form {

    state = {
        categories: [],
        data: { categoryId: '', name: '', featuredImage: '', status: '' },
        errors: {}
    }

    schema = {
        categoryId: Joi.string().min(3).max(30).required(),
        name: Joi.string().min(3).max(30).required(),
        featuredImage: Joi.any().required(),
        status: Joi.string().required(),
    };

    async componentDidMount() {
        const { data: records } = await CategoriesServices.getCategories();
        this.setState({categories: records})
    }

    doSubmit = async () => {
        // Create an object of formData
        const formData = new FormData();
        Object.keys(this.state.data).forEach(key => {
            if(key !== "featuredImage") {
                formData.append(key, this.state.data[key]);
            }
        });
        // Update the formData object
        formData.append(
            "featuredImage",
            this.state.data.featuredImage,
            this.state.data.featuredImage.name
        );
        
        await ProductsServices.addProducts(formData)
        // Call th server
        console.log("Form Submitted");
    }

    render() {
        const { errors, categories } = this.state;

        return <div className="row justify-content-md-center">
            <div className="col col-lg-2"></div>
            <div className="col">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="categoryId" className="col-sm-2 col-form-label">Select Category</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="categoryId" onChange={this.handleChange}>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.categoryId && <div className="alert alert-danger">{errors.categoryId}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="featuredImage" className="col-sm-2 col-form-label">Featured Image</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" name="featuredImage" onChange={this.handleChange} />
                            {errors.file && <div className="alert alert-danger">{errors.file}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="status" onChange={this.handleChange}>
                                <option value="">-- Select Status --</option>
                                <option value="enabled">Enabled</option>
                                <option value="disabled">Disabled</option>
                            </select>
                            {errors.status && <div className="alert alert-danger">{errors.status}</div>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
            <div className="col col-lg-2"></div>
        </div>
    }

}

export default Add
