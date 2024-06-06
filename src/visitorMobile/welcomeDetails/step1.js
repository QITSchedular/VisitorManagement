import React from "react";
import "./step1.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";

export const Step1 = () => {
  const navigate = useNavigate();
  const handlePreviousBtn = () => {
    navigate("/welcomevistor");
  };
  const hanldeOnContinue = () => {
    navigate("/checkinotp");
  };
  return (
    <div className="Step1">
      <div className="backbtn">
        <i
          class="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
        ></i>
      </div>
      <div className="header-step">
        <div className="step-number">
          <span>Step 1/4</span>
        </div>
        <div className="welcome-text">
          <span>Welcome!</span> <span>Fill in the details</span>
        </div>
      </div>
      <div className="input-text">
        <TextBox
          label="Name"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
        />
        <TextBox
          label="Mobile Number"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
        />
        <TextBox
          label="Company"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
        />
        <TextBox
          label="Location"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="last-textbox"
        />
      </div>
      <div className="btn-section">
        <Button
          text="Continue"
          width={"100%"}
          height={"44px"}
          onClick={hanldeOnContinue}
        />
      </div>
      <div className="already-text">
        <span> Already a visitor?</span>
        <span> Check Out</span>
      </div>
    </div>
  );
};
