import axios from "axios";
const API_URL = process.env.REACT_APP_API;

// Get all Visitor
export const getVisiotrCompanyWise = async(company_id) =>{
    const responseBody ={
        responseData :null,
        hasError : false,
        error:null
    }
    try{
        const response = await axios.get(`${API_URL}VMS/Visitor/GetAll/all/${company_id}`);
        responseBody.responseData = response.data;
        return responseBody;
    }catch(error){
        responseBody.hasError = true;
        responseBody.error =  error;

        return responseBody;
    }
}

//Verify Visitor
export const visitorDecision = async(payload)=>{

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
        return responseBody;
    }catch(error){
        console.log("error : " , error)
        responseBody.hasError = true
        responseBody.error = error.response.data.StatusMsg;
        return responseBody
    }
}

// Get Visitor by ID 
export const getVisitorDetailsApi = async(cmp_id ,visitor_id)=>{

    const responseBody ={
        responseData :  null,
        hasError : false ,
        error : null
    }

    console.log("this is my payload");
    //return null
    try{
        const response = await axios.get(`${API_URL}VMS/User/GetById/${cmp_id}/${visitor_id}`);
        responseBody.responseData = response.data;
        return responseBody;
    }catch(error){
        console.log("error : " , error)
        responseBody.hasError = true
        responseBody.error = error.response.data.StatusMsg;
        return responseBody
    }
}
