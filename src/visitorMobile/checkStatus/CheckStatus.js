import React from "react";
import "./checkstatus.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
const CheckStatus = () => {
  const navigate = useNavigate();
  const handlePreviousBtn = () => {
    navigate("/welcomevisitor");
  };
  return (
    <div className="CheckStatus">
      <div className="backbtn">
        <i
          class="ri-arrow-left-line"
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
            label="Mobile Number"
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="step-textbox"
          />
        </div>
      </div>
      <div className="status-btn">
        <Button text="Check Status" height={"44px"} width={"100%"} />
      </div>
    </div>
  );
};

export default CheckStatus;
