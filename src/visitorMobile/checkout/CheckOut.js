import React from "react";
import "./checkout.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
export const CheckOut = () => {
  const navigate = useNavigate();
  const handlePreviousBtn = () => {
    navigate("/welcomevisitor");
  };
  return (
    <div className="Checkout">
      <div className="backbtn">
        <i
          class="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
        ></i>
      </div>
      <div className="welcome-text">
        <span>Come Soon!</span> <span>Fill in the details</span>
      </div>
      <div className="input-text">
        <TextBox
          label="Mobile Number"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
        />
      </div>
      <div className="btn-section">
        <Button text="Continue" width={"100%"} height={"44px"} />
      </div>
      <div className="already-text">
        <span>New Visitor ?</span>
        <span>Check In</span>
      </div>
    </div>
  );
};
