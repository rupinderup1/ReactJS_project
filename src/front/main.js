import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UsersService from "./services/usersServices";

import Header from './includes/header'
import Login from './login/index';
import Logout from './login/logout';
import Categories from './categories/listing';
import AddCategory from './categories/add';
import EditCategory from './categories/edit';

import Products from './products/listing';
import AddProduct from './products/add';

import "react-toastify/dist/ReactToastify.css";

class Main extends Component {

    user = {}
    constructor() {
        super();
        this.user = UsersService.getCurrentUser();
    }

    render() {
        
        return (<React.Fragment>
            
            <Header userName={this.user?this.user.name:''}></Header>

            <ToastContainer />
            
            <div className="container" style={{marginTop: "20px"}}>
                <Routes>
                    <Route path="/login" element={this.user?<Navigate to="/" />:<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    
                    <Route path="/products" element={!this.user?<Navigate to="/" />:<Products userName={this.user?this.user.name:''} />} />
                    <Route path="/products/add" element={!this.user?<Navigate to="/" />:<AddProduct />} />

                    <Route path="/categories" element={!this.user?<Navigate to="/" />:<Categories userName={this.user?this.user.name:''} />} />
                    <Route path="/categories/add" element={!this.user?<Navigate to="/" />:<AddCategory />} />
                    <Route path="/categories/edit/:id" element={!this.user?<Navigate to="/" />:<EditCategory />} />
                    <Route path="/" element={!this.user?<Navigate to="/login" />:'/'} />
                    <Route path='*' exact={true} element={<Navigate to="login" />} />
                </Routes>
            </div>
        </React.Fragment>)
    }

}

export default Main
