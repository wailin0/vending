import axios from '../utils/axios';
import {configs} from '../utils/configs';

const generateQR = async (postData) => {
    const response = await axios.post(`${configs.baseURL}/api/generateQRPayment`, postData);
    return response.data;
};

const checkQR = async (postData) => {
    const response = await axios.post(`${configs.baseURL}/api/checkQRPaymentStatus`, postData);
    return response.data;
};

const cancelQR = async (postData) => {
    const response = await axios.post(`${configs.baseURL}/api/cancelQRPayment`, postData);
    return response.data;
};
export default {
    generateQR,
    checkQR,
    cancelQR,
};
