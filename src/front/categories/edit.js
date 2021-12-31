import Joi from "joi";
import React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/common/form";
import CategoriesServices from "../services/categoriesServices";

class Edit extends Form {
    state = {
        data: { name: '', status: '' },
        errors: {}
    }

    schema = {
        name: Joi.string().min(3).max(30).required(),
        status: Joi.string().required(),
    };

    async componentDidMount() {
        const { route } = this.props;
        const editCategory = await CategoriesServices.getCategory(route.id)
        
        this.setState({
            data: {
                name: editCategory.data.name,
                status: editCategory.data.status,
            }
        })
    }

    doSubmit = async () => {
        const { route } = this.props;
        await CategoriesServices.updateCategories(route.id, this.state.data)
        // Call th server
        console.log("Form Submitted");
    }
    render() {
        const { errors } = this.state;
        const { route } = this.props;
        
        return <div className="row justify-content-md-center">
            <h4>Category Id is: {route.id}</h4>
            <div className="col col-lg-2"></div>
            <div className="col">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" value={this.state.data.name} onChange={this.handleChange} />
                            {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="status" value ={this.state.data.status} onChange={this.handleChange}>
                                <option value="">-- Select Status --</option>
                                <option value="enabled">Enabled</option>
                                <option value="disabled">Disabled</option>
                            </select>
                            {errors.status && <div className="alert alert-danger">{errors.status}</div>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Edit Category</button>
                </form>
            </div>
            <div className="col col-lg-2"></div>
        </div>
    }

}

// Wrap and export
export default function Test(props) {
    const route = useParams();
  
    return <Edit {...props} route={route} />;
}
