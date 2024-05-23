import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPasswordForm.scss";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { LoginImage, LoginLogo } from "../../assets";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";
import { Button, CheckBox } from "devextreme-react";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    navigate("/change-password");
  };

  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <div className="header-image">
            <img src={LoginLogo} alt="logo" width={200} height={70} />
          </div>
          <div className="header-title">
            <div className="header-main-title">
              <span>Reset Password </span>
            </div>
            <div className="header-sub-title">
              <div>
                Enter your email address to get an OTP to reset your password
              </div>
            </div>
          </div>
          <div className="login-container-right-body">
            <div className="inputField">
              <TextBox
                label="Email Address"
                placeholder="Input text"
                labelMode="static"
                stylingMode="outlined"
              >
                <Validator className="custom-validator">
                  <RequiredRule message="Email Address is required" />
                </Validator>
              </TextBox>
            </div>
          </div>

          <div className="login-container-right-footer">
            <Button
              text="Continue"
              width={"100%"}
              height={"48px"}
              // stylingMode="default"
              useSubmitBehavior={true}
              onClick={handleSubmit}
            />
          </div>
          <div className="terms-condition">
            <div>
              I agree with your{" "}
              <span className="terms-service">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container-right">
        <img src={LoginImage} alt="Login" />
      </div>
    </div>
  );
}
