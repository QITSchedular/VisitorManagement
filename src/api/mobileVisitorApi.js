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
    console.log(error);
    responseBody.error = 
      error.response?.data?.StatusMsg ||
      error.message ||
      error.response?.data?.errors;
    responseBody.hasError = true;
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
      console.log(error);
      responseBody.error = 
        error.response?.data?.StatusMsg ||
        error.message ||
        error.response?.data?.errors;
      responseBody.hasError = true;
      return responseBody;
    }
}
