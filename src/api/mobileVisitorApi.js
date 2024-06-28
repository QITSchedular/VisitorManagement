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
    await logToServer(
      "Visitors",
      "visitor_master",
      "Save_Visitor",
      "S",
      "SuccessFully save visitor Data...",
      JSON.stringify(payload),
      "",
      0
    );
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.error = error;
    await logToServer(
      "Visitors",
      "visitor_master",
      "Save_Visitor",
      "E",
      "UnSuccessFully save visitor Data...",
      JSON.stringify(payload),
      "",
      0
    );
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
        responseBody.error = error;
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
