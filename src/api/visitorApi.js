import axios from "axios";
import { logToServer } from "./logger";
const API_URL = process.env.REACT_APP_API;

// Get all Visitor

export const getVisiotrCompanyWise = async(company_id) =>{
    const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

  const { access, refresh, user, userAuth, expirationTime } =
    storedSessionValue;
    const responseBody ={
        responseData :null,
        hasError : false,
        error:null
    }
    try{
        const response = await axios.get(`${API_URL}VMS/Visitor/GetAll/all/${company_id}`);
        responseBody.responseData = response.data;
        await logToServer(
            "Visitors",
            "visitor_master",
            "GetAllVisitor",
            "I",
            "SuccessFully get all visitors Data...",
            JSON.stringify(company_id),
            user.e_mail,
            user.cmpid
          );
        return responseBody;
    }catch(error){
        responseBody.hasError = true;
        responseBody.error =  error;
        await logToServer(
            "Visitors",
            "visitor_master",
            "GetAllVisitor",
            "E",
            "UnSuccessFully get all visitors Data...",
            JSON.stringify(company_id),
            user.e_mail,
            user.cmpid
          );
        return responseBody;
    }
}

//Verify Visitor
export const visitorDecision = async(payload)=>{
    const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

    const { access, refresh, user, userAuth, expirationTime } =
      storedSessionValue;
    const responseBody ={
        responseData :  null,
        hasError : false ,
        error : null
    }

    console.log("this is my payload");
    //return null
    try{
        const response = await axios.post(`${API_URL}VMS/Visitor/VerifyVisitor`,payload);
        responseBody.responseData = response.data;
        await logToServer(
            "Verify Visitors",
            "visitor_master",
            "VerifyVisitor",
            "S",
            "SuccessFully verified visitors Data...",
            JSON.stringify(payload),
            user.e_mail,
            user.cmpid
          );
        return responseBody;
    }catch(error){
        console.log("error : " , error)
        responseBody.hasError = true
        responseBody.error = error.response.data.StatusMsg;
        await logToServer(
            "Verify Visitors",
            "visitor_master",
            "VerifyVisitor",
            "E",
            "UnSuccessFully verified visitors Data...",
            JSON.stringify(payload),
            user.e_mail,
            user.cmpid
          );
        return responseBody
    }
}

// Get Visitor by ID 
export const getVisitorDetailsApi = async(cmp_id ,visitor_id)=>{
    const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

    const { access, refresh, user, userAuth, expirationTime } =
      storedSessionValue;
    const responseBody ={
        responseData :  null,
        hasError : false ,
        error : null
    }

    console.log("this is my payload");
    //return null
    try{
        const response = await axios.get(`${API_URL}VMS/Visitor/GetVisitorDetail/${visitor_id}/${cmp_id}`);
        responseBody.responseData = response.data;
        await logToServer(
            "Verify Visitors",
            "visitor_master",
            "get_user_by_id",
            "I",
            "SuccessFully get visitors detail Data...",
            JSON.stringify(visitor_id),
            user.e_mail,
            user.cmpid
          );
        return responseBody;
    }catch(error){
        console.log("error : " , error)
        responseBody.hasError = true
        responseBody.error = error.response.data.StatusMsg;
        await logToServer(
            "Verify Visitors",
            "visitor_master",
            "get_user_by_id",
            "E",
            "UnSuccessFully get visitors detail Data...",
            JSON.stringify(visitor_id),
            user.e_mail,
            user.cmpid
          );
        return responseBody
    }

}

// Edit Visitor
export const getVisitorEditedApi =async(payload)=>{

  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };

  try {
    const response = await axios.put(
      `${API_URL}VMS/Visitor/Edit`,payload
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    console.log("error : ", error);
    responseBody.hasError = true;
    responseBody.error =
      error.response?.data?.StatusMsg ||
      error.message ||
      error.response?.data?.errors;
    return responseBody;
  }

}


