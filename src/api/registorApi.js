import axios from "axios";
const API_URL = process.env.REACT_APP_API;

export const registerUserApi = async (payload) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", payload);
  //return null;
  try {
    const response = await axios.post(`${API_URL}VMS/Register`, payload);
    responseBody.response = response.data;
    return responseBody;
  } catch (error) {
    responseBody.error = error;
    responseBody.hasError = true;
    return responseBody;
  }
};

export const requestOtp = async (email, role) => {
  console.log("api url : ", API_URL);
  const payload = {
    e_mail: email,
    role: role,
  };
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  try {
    console.log("payload : ", payload);
    const response = await axios.post(`${API_URL}VMS/GenerateOTP`, payload);
    responseBody.response = response.data;
    return responseBody;
  } catch (error) {
    responseBody.error = error;
    responseBody.hasError = true;
    return responseBody;
  }
};

export const VerifyOtp = async (email, otp, role) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  const payload = {
    e_mail: email,
    VerifyOTP: otp,
    role: role,
  };
  try {
    const response = await axios.post(`${API_URL}VMS/VerifyOTP`, payload);
    responseBody.response = response.data;
    return responseBody;
  } catch (error) {
    responseBody.error = error;
    responseBody.hasError = true;
    return responseBody;
  }
};
