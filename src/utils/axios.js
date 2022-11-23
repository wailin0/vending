import axios from 'axios';
import * as RootNavigation from '../navigations/rootNavigation';
import storage from './storage';

axios.interceptors.request.use(async function (config) {

    const apiKey = await storage.getItem()

    config = {
        ...config,
        data: {
            ...config.data,
            apiKey
        }
    }

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
    
    if (response.data.description === 'wrong api key') {
        alert("invalid api key")
        RootNavigation.navigate('Logout Device');
    }
    return response;
}, function (error) {
    alert(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios;
