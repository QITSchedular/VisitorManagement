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
            "e_mail":email
        }
      var apiRes = await axios.post(`${API_URL}VMS/ForgetPasswordOTP`, payload);
      if (apiRes.status == 200) {
        console.log("APIresponse : ",apiRes.data);
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

export async function GenerateNewPassword(email,password) {
    let responseBody = {
      hasError: true,
      responseData: null,
      errorMessage: null,
    };
    try {
        const payload = {
            "e_mail":email,
            "password":password
        }
      var apiRes = await axios.post(`${API_URL}VMS/GenerateNewPassword`, payload);
      if (apiRes.status == 200) {
        console.log("APIresponse : ",apiRes.data);
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

export async function GettingDepratmentdata(company_id){
  const responsebody ={
    repsonseData : null,
    hasError : false ,
    error : null
  }
  try{
    const response = await axios.get(`${API_URL}VMS/Department/GetByCid/${company_id}`);
    responsebody.repsonseData = response.data;
    return responsebody;
  }catch(error){
    responsebody.hasError = false
    responsebody.error = error
    return responsebody
  }   
}

export async function checkUserStatus(email , company_id){
  const responseBody ={
    responseData: null, 
    hasError :false ,
    error: null
  }
  const payload ={
    e_mail: email,
    company_id: company_id
  }
  try{
    const response = await axios.post(`${API_URL}VMS/Visitor/CheckStatus`, payload);
    responseBody.responseData = response.data
    return responseBody;
  }catch(error){
    responseBody.hasError = true
    responseBody.error = error
    return responseBody
  }
}