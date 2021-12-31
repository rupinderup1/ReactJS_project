import { toast } from "react-toastify";

import Http from "./httpServices";
import UsersServices from "./usersServices";
import Config from "../config.json";

const apiEndPoint = Config.apiEndPoint+"/categories";

Http.setJwt(UsersServices.getToken());

export async function getCategories(post) {
    const response = await Http.get(apiEndPoint);
    return response.data;
}

export async function addCategories(post) {
    const {data} = await Http.post(apiEndPoint, post);
    if(data.success) {
        toast.success(data.message);
    } else {
        toast.error(data.message);
    }
}

export async function getCategory(id) {
    const response = await Http.get(apiEndPoint+"/"+id);
    return response.data;
}

export async function updateCategories(id, post) {
    const {data} = await Http.put(apiEndPoint+"/"+id, post);
    if(data.success) {
        toast.success(data.message);
    } else {
        toast.error(data.message);
    }
}

const categories = {
    getCategories,
    getCategory,
    addCategories,
    updateCategories
}

export default categories;
