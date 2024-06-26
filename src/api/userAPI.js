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

// get user data
export const GetAllUser = async (cid) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", cid);
  //return null;
  try {
    const response = await axios.get(`${API_URL}VMS/User/Get/ALL/${cid}`);
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

// Update user data
export const EditUser = async (reqBody) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", reqBody);
  //return null;
  try {
    const response = await axios.put(`${API_URL}VMS/User/Update`, reqBody);
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

// get company profile data
export const GetCmpDetail = async (cid) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", cid);
  //return null;
  try {
    const response = await axios.get(`${API_URL}VMS/GetComapnyDataById/${cid}`);
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

export const UpdateCmpData = async (reqPayload) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", reqPayload);
  //return null;
  try {
    const response = await axios.put(`${API_URL}VMS/Company/Edit`, reqPayload);
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
