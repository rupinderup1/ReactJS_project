import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if(!expectedError) {
        console.log("Logging the error", error);

    }
    return Promise.reject(error);
});

export function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}


export function getHttp(url) {
    return axios.get(url);
}


export function postHttp(url, post) {
    return axios.post(url, post);
}


export function putHttp(url, post) {
    return axios.put(url, post);
}


export function deleteHttp(url, post) {
    return axios.delete(url, post);
}

const httpservice = {
    get: getHttp,
    post: postHttp,
    put: putHttp,
    delete: deleteHttp,
    setJwt
};
export default httpservice;
