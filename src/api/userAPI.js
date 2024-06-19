import axios from "axios";
const API_URL = process.env.REACT_APP_API;

// get department data
export const GetCmpDept = async (cid) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", cid);
  //return null;
  try {
    const response = await axios.get(
      `${API_URL}VMS/Department/GetByCid/${cid}`
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.message ||
      error.response?.data?.errors;
    responseBody.hasError = true;
    return responseBody;
  }
};

// save user data
export const SaveUserData = async (reqPayload) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", reqPayload);
  //return null;
  try {
    const response = await axios.post(`${API_URL}VMS/User/Save`, reqPayload);
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.message ||
      error.response?.data?.errors;
    responseBody.hasError = true;
    return responseBody;
  }
};