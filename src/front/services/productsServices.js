import { toast } from "react-toastify";

import Http from "./httpServices";
import UsersServices from "./usersServices";
import Config from "../config.json";

Http.setJwt(UsersServices.getToken());

const apiEndPoint = Config.apiEndPoint+"/products";

export async function getProducts() {
    const {data} = await Http.get(apiEndPoint);
    return data
}

export async function addProducts(post) {
    const {data} = await Http.post(apiEndPoint, post);
    if(data.success) {
        toast.success(data.message);
    } else {
        toast.error(data.message);
    }
}

const products = {
    getProducts,
    addProducts
};

export default products;
