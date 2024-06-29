import axios from "axios";
import { logToServer } from "./logger";
const REACT_APP_API = process.env.REACT_APP_API;

export const registerUserApi = async (payload) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  console.log("payload : ", payload);
  //return null;
  try {
    const response = await axios.post(`${REACT_APP_API}VMS/Register`, payload);
    responseBody.response = response.data;
    await logToServer(
      "CreateCompany",
      "company_master",
      "CreateCompany",
      "S",
      "SuccessFully register company Data...",
      JSON.stringify(payload),
      "",
      0
    );
    return responseBody;
  } catch (error) {
    responseBody.error = error;
    responseBody.hasError = true;
    await logToServer(
      "CreateCompany",
      "company_master",
      "CreateCompany",
      "E",
      "UnSuccessFully register company Data...",
      JSON.stringify(payload),
      "",
      0
    );
    return responseBody;
  }
};

export const requestOtp = async (email, role) => {
  console.log("api url : ", REACT_APP_API);
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
    const response = await axios.post(
      `${REACT_APP_API}VMS/GenerateOTP`,
      payload
    );
    responseBody.response = response.data;
    return responseBody;
  } catch (error) {
    console.log(error);
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.message ||
      error.response?.data?.errors;
    responseBody.hasError = true;
    await logToServer(
      "GenerateOTP",
      "common",
      "GenerateOTP",
      "E",
      "UnSuccessFully generate OTP...",
      JSON.stringify(payload),
      email,
      0
    );
    return responseBody;
  }
};

export const VerifyOtp = async (email, otp, role) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  const payload = {
    e_mail: email,
    VerifyOTP: otp,
    role: role,
  };
  // return console.log("payload : " , payload)
  try {
    const response = await axios.post(`${REACT_APP_API}VMS/VerifyOTP`, payload);
    responseBody.response = response.data;
    if (response.data.Status === 400) {
      responseBody.hasError = true;
      responseBody.errorMessage = response.data.StatusMsg;
    }
    await logToServer(
      "VerifyOTP",
      "common",
      "VerifyOTP",
      "S",
      "SuccessFully verify OTP...",
      JSON.stringify(payload),
      email,
      0
    );
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
      await logToServer(
        "VerifyOTP",
        "common",
        "VerifyOTP",
        "E",
        "UnSuccessFully verify OTP...",
        JSON.stringify(payload),
        email,
        0
      );
    return responseBody;
  }
};
