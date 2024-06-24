import axios from "axios";
const API_URL = process.env.REACT_APP_API;

export const registerVisitorApi = async (payload) => {
    const responseBody = {
        responsedata: null,
        hasError: false,
        error: null,
    };

    try {
        const response = await axios.post(`${API_URL}VMS/Visitor/Save`, payload);
        responseBody.responsedata = response.data;
        return responseBody;
    } catch (error) {
        responseBody.hasError = true;
        responseBody.error = error;

        return responseBody;
    }
};

export const checkOutVisitorApi = async(payload)=>{
    const responseBody = {
        responsedata: null,
        hasError: false,
        error: null,
    };
    
    try {
        const response = await axios.post(`${API_URL}VMS/Visitor/CheckOut`, payload);
        responseBody.responsedata = response.data;
        return responseBody;
    } catch (error) {
        responseBody.hasError = true;
        responseBody.error = error;

        return responseBody;
    }
}
