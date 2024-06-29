import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPasswordForm.scss";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { LoginImage, LoginLogo } from "../../assets";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";
import { Button, CheckBox } from "devextreme-react";
import { forgetPasswordChk } from "../../api/common";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(false);
  const handleSubmit = async () => {
    navigate("/reset-pwd-link");
    try {
      var apiRes = await forgetPasswordChk(email);
      console.log("APPIRESPONSE : ", apiRes);
      if (!apiRes.hasError) {
        const data = apiRes.responseData;
        if (
          (data && data.Role.toUpperCase() == "USER") ||
          data.Role.toUpperCase() == "ADMIN"
        ) {
          // need to make an page which redirect for request link
        }
        if (data && data.Role.toUpperCase() == "COMPANY") {
          console.log("Hello : +++++++++++");
          return navigate("/otp-verification", {
            state: { From: "ResetPassword", Email: email },
          });
        }
        // navigate("/change-password");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
    // console.log("Email : ",email);
    // navigate("/change-password");
  };
  const handleEmail = (e) => {
    return setEmail(e.value);
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
                valueChangeEvent="keyup"
                onValueChanged={handleEmail}
                height={56}
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
