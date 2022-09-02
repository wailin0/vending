import axios from 'axios';

axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    alert(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    alert(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios;
