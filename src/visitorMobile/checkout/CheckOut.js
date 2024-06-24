import React, { useState } from "react";
import "./checkout.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { checkOutVisitorApi } from "../../api/mobileVisitorApi";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
export const CheckOut = () => {
  const [email ,setEmail] = useState();
  const navigate = useNavigate();
  const handlePreviousBtn = () => {
    navigate("/welcomevisitor");
  };
  const handleCheckInNavigate =()=>{
    navigate('/welcomestep1')
  }

  const handleInputChange =(e)=>{
    setEmail(e)
  };
  const handleVisitorCheckOut = async() =>{
    console.log("email : ",email)
    const payload ={
      company_id : 2,
      e_mail:email
    }
    const checkOut = await checkOutVisitorApi(payload);
    if(checkOut.hasError === true ){
      return toastDisplayer("error",`${checkOut.error}`)
    }

    return toastDisplayer("success","Checked Out")
  } 
  return (
    <div className="Checkout">
      <div className="backbtn">
        <i
          className="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
        ></i>
      </div>
      <div className="welcome-text">
        <span>Come Soon!</span> <span>Fill in the details</span>
      </div>
      <div className="input-text">
        <TextBox
          label="Email Address"
          onKeyDown={true}
          valueChangeEvent="keyup"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          onValueChange={handleInputChange}
          
        />
      </div>
      <div className="btn-section">
        <Button text="Continue" width={"100%"} height={"44px"} onClick={handleVisitorCheckOut} />
      </div>
      <div className="already-text">
        <span>New Visitor ?</span>
        <span onClick={handleCheckInNavigate}>Check In</span>
      </div>
    </div>
  );
};
