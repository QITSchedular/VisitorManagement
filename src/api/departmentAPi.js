import axios from "axios";
import { logToServer } from "./logger";
const API_URL = process.env.REACT_APP_API;

export const saveDepartment = async (payload) => {
  const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

  const { access, refresh, user, userAuth, expirationTime } =
    storedSessionValue;
  const responseBody = {
    responsedata: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const response = await axios.post(`${API_URL}VMS/Department/Save`, payload);
    responseBody.responsedata = response.data;
    if (response.data.Status === 400) {
      responseBody.hasError = true;
      responseBody.errorMessage = response.data.StatusMsg;
    }
    await logToServer(
      "User Settings",
      "dept_master",
      "SaveDepartment",
      "S",
      "SuccessFully save department Data...",
      JSON.stringify(payload),
      user.e_mail,
      user.cmpid
    );
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
      await logToServer(
        "User Settings",
        "dept_master",
        "SaveDepartment",
        "E",
        "UnSuccessFully save department Data...",
        JSON.stringify(payload),
        user.e_mail,
        user.cmpid
      );
    return responseBody;
  }
};
export const updateDepartment = async (payload) => {
  const responseBody = {
    responsedata: null,
    hasError: false,
    errorMessage: null,
  };
  const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

  const { access, refresh, user, userAuth, expirationTime } =
    storedSessionValue;
  try {
    const response = await axios.put(
      `${API_URL}VMS/Department/Update`,
      payload
    );
    responseBody.responsedata = response.data;
    if (response.data.Status === 400) {
      responseBody.hasError = true;
      responseBody.errorMessage = response.data.StatusMsg;
    }
    await logToServer(
      "User Settings",
      "dept_master",
      "EditDepartment",
      "S",
      "SuccessFully update department Data...",
      JSON.stringify(payload),
      user.e_mail,
      user.cmpid
    );
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
      await logToServer(
        "User Settings",
        "dept_master",
        "EditDepartment",
        "E",
        "UnSuccessFully update department Data...",
        JSON.stringify(payload),
        user.e_mail,
        user.cmpid
      );
    return responseBody;
  }
};
export const deleteDepartment = async (deptID, compID) => {
  const responseBody = {
    responsedata: null,
    hasError: false,
    errorMessage: null,
  };
  const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

  const { access, refresh, user, userAuth, expirationTime } =
    storedSessionValue;
  try {
    const response = await axios.delete(
      `${API_URL}VMS/Department/Delete/${deptID}/${compID}`
    );
    responseBody.responsedata = response.data;
    if (response.data.Status === 400) {
      responseBody.hasError = true;
      responseBody.errorMessage = response.data.StatusMsg;
    }
    await logToServer(
      "User Settings",
      "dept_master",
      "DeleteDepartment",
      "S",
      "SuccessFully delete department Data...",
      JSON.stringify(deptID),
      user.e_mail,
      user.cmpid
    );
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
      await logToServer(
        "User Settings",
        "dept_master",
        "DeleteDepartment",
        "E",
        "UnSuccessFully delete department Data...",
        JSON.stringify(deptID),
        user.e_mail,
        user.cmpid
      );
    return responseBody;
  }
};
export async function GettingDepratmentdata(company_id) {
  const responsebody = {
    repsonseData: null,
    hasError: false,
    error: null,
  };
  const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

  const { access, refresh, user, userAuth, expirationTime } =
    storedSessionValue;
  try {
    const response = await axios.get(
      `${API_URL}VMS/Department/GetByCid/${company_id}`
    );
    responsebody.repsonseData = response.data;
    await logToServer(
      "User Settings",
      "dept_master",
      "GetAllDeptByCId",
      "I",
      "SuccessFully getting department Data...",
      JSON.stringify(company_id),
      user.e_mail,
      user.cmpid
    );
    return responsebody;
  } catch (error) {
    responsebody.hasError = false;
    responsebody.error = error;
    await logToServer(
      "User Settings",
      "dept_master",
      "GetAllDeptByCId",
      "E",
      "UnSuccessFully getting department Data...",
      JSON.stringify(company_id),
      user.e_mail,
      user.cmpid
    );
    return responsebody;
  }
}
