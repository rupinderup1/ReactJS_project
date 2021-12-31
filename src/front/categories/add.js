import React from "react";
import Joi from "joi";
import Form from "../components/common/form";
import CategoriesServices from "../services/categoriesServices";

class Add extends Form {

    state = {
        data: { name: '', status: '' },
        errors: {}
    }

    schema = {
        name: Joi.string().min(3).max(30).required(),
        status: Joi.string().required(),
    };

    doSubmit = async () => {
        await CategoriesServices.addCategories(this.state.data)
        // Call th server
        console.log("Form Submitted");
    }

    render() {
        const { errors } = this.state;

        return <div className="row justify-content-md-center">
            <div className="col col-lg-2"></div>
            <div className="col">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            {errors.name && <div className="alert alert-danger">{errors.name}</div>}
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
                    <button type="submit" className="btn btn-primary">Add Category</button>
                </form>
            </div>
            <div className="col col-lg-2"></div>
        </div>
    }

}

export default Add
