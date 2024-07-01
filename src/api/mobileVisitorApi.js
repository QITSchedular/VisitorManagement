import axios from "axios";
import { logToServer } from "./logger";
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
        await logToServer(
          "Visitors",
          "visitor_master",
          "checkoutVisitor",
          "S",
          "SuccessFully checkout visitor Data...",
          JSON.stringify(payload),
          "",
          0
        );
        return responseBody;
    } catch (error) {

        responseBody.hasError = true;
        responseBody.error = error.response.data.StatusMsg
        await logToServer(
          "Visitors",
          "visitor_master",
          "checkoutVisitor",
          "E",
          "UnSuccessFully checkout visitor Data...",
          JSON.stringify(payload),
          "",
          0
        );
        return responseBody;
    }
}
