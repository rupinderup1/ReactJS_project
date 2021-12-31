import Joi from "joi";
import React from "react";
import Form from "../components/common/form";
import UsersService from "../services/usersServices";

class Login extends Form {

    state = {
        data: { email: '', password: '' },
        errors: {}
    }

    schema = {
        email: Joi.string().min(3).max(30).required(),
        password: Joi.string().required(),
    };

    doSubmit = async () => {
        await UsersService.login(this.state.data)
        window.location = "/";
    }

    render() {
        
        const { errors } = this.state;

        return (<form onSubmit={this.handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              {errors.email && <div className="alert alert-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChange} />
              {errors.password && <div className="alert alert-danger">{errors.password}</div>}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>);
    }
}

export default Login
