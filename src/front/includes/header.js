import React, { Component } from "react";
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom'

class Header extends Component {
    render() {
        const { userName, currentpath } = this.props
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
                <div className="container-fluid">
                    <a className="navbar-brand" href="javscript:void(0)">E-Commerce</a>
                    <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {userName && <React.Fragment>
                            <li className="nav-item">
                            <Link className={currentpath.includes("/") && currentpath.length === 1?"nav-link active":"nav-link"} to="/">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                            <Link className={currentpath.includes("/categories")?"nav-link active":"nav-link"} to="/categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                            <Link className={currentpath.includes("/products")?"nav-link active":"nav-link"} to="/products">Products</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="javscript:void(0)" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
                                <ul className="dropdown-menu" aria-labelledby="dropdown01">
                                    <li><a className="dropdown-item" href="javscript:void(0)">Action</a></li>
                                    <li><a className="dropdown-item" href="javscript:void(0)">Another action</a></li>
                                    <li><a className="dropdown-item" href="javscript:void(0)">Something else here</a></li>
                                </ul>
                            </li>
                            </React.Fragment> }
                            {!userName && <React.Fragment>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/login">Login</Link>
                            </li>
                            </React.Fragment>
                            }
                        </ul>
                        {userName && <React.Fragment>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="javscript:void(0)">{userName}</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/logout">Logout</a>
                            </li>
                        </ul>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}


export default function HeaderView(props) {
    const location = useLocation();
    return <Header {...props} currentpath={location.pathname} />
}
