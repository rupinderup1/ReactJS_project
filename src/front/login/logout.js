import { Component } from "react";
import UsersService from "../services/usersServices";

class Logout extends Component {

    componentDidMount() {
        UsersService.logout();
        window.location = "/login";
    }

    render() {
        return null; 
    }
}

export default Logout
