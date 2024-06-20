import axios from "axios";
const API_URL = process.env.REACT_APP_API;

export async function forgetPasswordChk(email) {
  let responseBody = {
    hasError: true,
    responseData: null,
    errorMessage: null,
  };
  try {
    const payload = {
      e_mail: email,
    };
    var apiRes = await axios.post(`${API_URL}VMS/ForgetPasswordOTP`, payload);
    if (apiRes.status == 200) {
      console.log("APIresponse : ", apiRes.data);
      responseBody.hasError = false;
      responseBody.responseData = apiRes.data;
      return responseBody;
    } else {
      responseBody.errorMessage = "Not Save Data..!!";
    }
  } catch (error) {
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

export async function GenerateNewPassword(email, password) {
  let responseBody = {
    hasError: true,
    responseData: null,
    errorMessage: null,
  };
  try {
    const payload = {
      e_mail: email,
      password: password,
    };
    var apiRes = await axios.post(`${API_URL}VMS/GenerateNewPassword`, payload);
    if (apiRes.status == 200) {
      console.log("APIresponse : ", apiRes.data);
      responseBody.hasError = false;
      responseBody.responseData = apiRes.data;
      return responseBody;
    } else {
      responseBody.errorMessage = "Not Save Data..!!";
    }
  } catch (error) {
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

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

export async function checkUserStatus(email, company_id) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  const payload = {
    e_mail: email,
    company_id: company_id,
  };
  try {
    const response = await axios.post(
      `${API_URL}VMS/Visitor/CheckStatus`,
      payload
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.error = error;
    return responseBody;
  }
}

// VMS/User/Get/All/38
// Get All User API
export async function getUserData(type, cmpid) {
  // const token = localStorage.getItem("token");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  // if (token != null) {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // const response = await axios.get(`${API_URL}/User`, {
    //   headers: headers,
    // });
    const response = await axios.get(`${API_URL}VMS/User/Get/${type}/${cmpid}`);

    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
  // } else {

  //   responseBody.hasError = true;
  //   responseBody.errorMessage = "something wrong";
  //   return responseBody;
  // }
}

// Get auth rule by user
export const getUserAuthRole = async (email, role, cmpid) => {
  // const myCookieValue = localStorage.getItem("token");
  // const userData = localStorage.getItem("User");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    // if (myCookieValue != null && userData != null) {
    const payload = {
      useremail: email,
      userrole: role,
      cmptransid: cmpid,
    };
    // const headers = {
    //   Authorization: `Bearer ${myCookieValue}`,
    // };
    // const response = await axios.post(
    //   `${API_URL}/AuthUser/GetAuthRule`,
    //   reqObj,
    //   {
    //     headers: headers,
    //   }
    // );
    const response = await axios.post(`${API_URL}VMS/AuthUser/GET`, payload);

    responseBody.responseData = response.data;
    return responseBody;
    // }
    // else {

    //   responseBody.hasError = true;
    //   responseBody.errorMessage = "UnAuthorise for add user";
    //   return responseBody;
    // }
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.errorMessage || error.response?.data?.errors;
    return responseBody;
  }
};

// Add auth rule
export async function postAuthenticationRule(payload) {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  // const myCookieValue = localStorage.getItem("token");
  // const userData = localStorage.getItem("User");
  // const storedData = localStorage.getItem("AuthRule");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  // if (myCookieValue != null && userData != null && storedData != null) {
  try {
    // const headers = {
    //   Authorization: `Bearer ${myCookieValue}`,
    // };
    const response = await axios.post(`${API_URL}VMS/AuthUser/Save`, payload);
    // const response = await axios.post(
    //   `${API_URL}/AuthUser/SaveAuthRule`,
    //   payload,
    //   {
    //     headers: headers,
    //   }
    // );

    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
  // } else {
  //   responseBody.hasError = true;
  //   responseBody.errorMessage = "something wrong";
  //   return responseBody;
  // }
}

// Get Notification auth rule by user
export const getUserNotificationRule = async (email, role, cmpid) => {
  // const myCookieValue = localStorage.getItem("token");
  // const userData = localStorage.getItem("User");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    // if (myCookieValue != null && userData != null) {
    const payload = {
      useremail: email,
      userrole: role,
      cmptransid: cmpid,
    };
    // const headers = {
    //   Authorization: `Bearer ${myCookieValue}`,
    // };
    // const response = await axios.post(
    //   `${API_URL}/AuthUser/GetAuthRule`,
    //   reqObj,
    //   {
    //     headers: headers,
    //   }
    // );
    const response = await axios.post(
      `${API_URL}VMS/NotificationAuthUser/GET`,
      payload
    );

    responseBody.responseData = response.data;
    return responseBody;
    // }
    // else {

    //   responseBody.hasError = true;
    //   responseBody.errorMessage = "UnAuthorise for add user";
    //   return responseBody;
    // }
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.errorMessage || error.response?.data?.errors;
    return responseBody;
  }
};

// Add Notification auth rule
export async function postNotificationRule(payload) {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  // const myCookieValue = localStorage.getItem("token");
  // const userData = localStorage.getItem("User");
  // const storedData = localStorage.getItem("AuthRule");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  // if (myCookieValue != null && userData != null && storedData != null) {
  try {
    // const headers = {
    //   Authorization: `Bearer ${myCookieValue}`,
    // };
    const response = await axios.post(
      `${API_URL}VMS/NotificationAuthUser/Save`,
      payload
    );
    // const response = await axios.post(
    //   `${API_URL}/AuthUser/SaveAuthRule`,
    //   payload,
    //   {
    //     headers: headers,
    //   }
    // );

    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
  // } else {
  //   responseBody.hasError = true;
  //   responseBody.errorMessage = "something wrong";
  //   return responseBody;
  // }
}
