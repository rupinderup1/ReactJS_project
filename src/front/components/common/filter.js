import React, { Component } from "react";
import { Link } from "react-router-dom";

class Filter extends Component {

    render() {
        const { handleSearch, fields } = this.props;
        return ( <React.Fragment>
                <Link to="/categories/add" className="btn btn-primary">Add Category</Link>
                <form className="row g-3" onSubmit={handleSearch}>
                    <h4>Filter</h4>

                    {fields.map(field => (
                        <div key={field.name} className="col-md-3">
                            {field.type === "text"?<input type={field.type} className="form-control" name={field.name} placeholder={field.placeholder} />:''}

                            {field.type === "select"?<select className="form-control" name={field.name}>
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>:''}
                        </div>
                    ))}
                    <div className="col-md-1">
                        <input type="submit" className="btn btn-danger" value="Search" />
                    </div>
                </form>
                <br /><br />
            </React.Fragment>
        )
    }

}

export default Filter;
