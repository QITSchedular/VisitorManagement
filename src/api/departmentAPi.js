import axios from "axios";
const API_URL = process.env.REACT_APP_API;

export const saveDepartment = async (payload) => {
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

    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
    return responseBody;
  }
};
export const updateDepartment = async (payload) => {
  const responseBody = {
    responsedata: null,
    hasError: false,
    errorMessage: null,
  };

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

    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
    return responseBody;
  }
};
export const deleteDepartment = async (deptID, compID) => {
  const responseBody = {
    responsedata: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const response = await axios.delete(
      `${API_URL}VMS/Department/Delete/${deptID}/${compID}`
    );
    responseBody.responsedata = response.data;
    if (response.data.Status === 400) {
      responseBody.hasError = true;
      responseBody.errorMessage = response.data.StatusMsg;
    }

    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.StatusMsg ||
      error.response?.data?.errors ||
      error.message;
    return responseBody;
  }
};
export async function GettingDepratmentdata(company_id) {
  const responsebody = {
    repsonseData: null,
    hasError: false,
    error: null,
  };
  try {
    const response = await axios.get(
      `${API_URL}VMS/Department/GetByCid/${company_id}`
    );
    responsebody.repsonseData = response.data;
    return responsebody;
  } catch (error) {
    responsebody.hasError = false;
    responsebody.error = error;
    return responsebody;
  }
}
