import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import Http from "./httpServices";
import Config from "../config.json";

const apiEndPoint = Config.apiEndPoint+"/auth";
const TokenKey = "token";

Http.setJwt(getToken());

export async function login(post) {
    const {data} = await Http.post(apiEndPoint, post);
    if(data.success) {
        localStorage.setItem(TokenKey, data.token);
        toast.success(data.message);
    } else {
        toast.error(data.message);
    }
}

export function logout() {
    return localStorage.removeItem(TokenKey)
}

export function getToken() {
    return localStorage.getItem(TokenKey);
}


export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(TokenKey);
        return jwtDecode(jwt);
    } catch (e) {

    }
}

const users = {
    getCurrentUser,
    login,
    getToken,
    logout
};

export default users;
