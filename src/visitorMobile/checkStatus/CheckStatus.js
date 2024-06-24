import React, { useState } from "react";
import "./checkstatus.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { checkUserStatus } from "../../api/common";
const CheckStatus = () => {
  const [email ,setEmail ]= useState("");
  const navigate = useNavigate();
  const handlePreviousBtn = () => {
    navigate("/welcomevisitor");
  };
  const handleChangeInput=(e)=>{
    setEmail(e);
  }
  const handleContinue =async()=>{
    if(!email){
      return console.log("Enter Email")
    }
    const company_id = 2;
    const checkStatus = await checkUserStatus(email , company_id);

    if(checkStatus.hasError === true){
        return console.log(checkStatus.error);
      }
      const status = checkStatus.responseData.status;
      console.log('Status : ' ,status)
      navigate(`/statusPage?status=${status}`);

  }

  return (
    <div className="CheckStatus">
      <div className="backbtn">
        <i
          className="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
        ></i>
      </div>
      <div className="inner-container ">
        <div className="upper">
          <span>Check Status !</span>
          <span> Fill in the details </span>
        </div>
        <div className="lower">
          <TextBox
            label="Email"
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="step-textbox"
            onValueChange={handleChangeInput}
          />
        </div>
      </div>
      <div className="status-btn">
        <Button text="Check Status" height={"44px"} width={"100%"} onClick={handleContinue}/>
      </div>
    </div>
  );
};

export default CheckStatus;
