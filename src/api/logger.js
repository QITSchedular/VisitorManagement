import axios from "axios";
const API_URL = process.env.REACT_APP_API;
export const logToServer = async (
    Module,
    ControllerName,
    MethodName,
    LogLevel,
    LogMessage,
    jsonPayload,
    loginUser,
    Company_Id
) => {
    const responseBody = {
        responseData: null,
        hasError: false,
        errorMessage: null,
    };
    const user = loginUser ? loginUser : "";
  
    const requestBody = {
        Module,
        ControllerName,
        MethodName,
        LogLevel,
        LogMessage,
        jsonPayload,
        LoginUser:user,
        Company_Id
    };
    try {
        const response = await axios.post(`${API_URL}VMS/SaveAPILog`, requestBody);
        responseBody.responseData = response.data[0];
        return responseBody;
    } catch (error) {
        responseBody.hasError = true;
        responseBody.errorMessage = responseBody.errorMessage =
            error.response?.data?.statusMsg || error.response?.data?.errors;
        return responseBody;
    }
};