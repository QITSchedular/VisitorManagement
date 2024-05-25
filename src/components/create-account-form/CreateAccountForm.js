import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";
import notify from "devextreme/ui/notify";
import { useAuth } from "../../contexts/auth";
import { Button, CheckBox } from "devextreme-react";
import { eyeopen, eyeclose } from "../../assets/icon";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { LoginImage, LoginLogo } from "../../assets";
import { createAccount } from "../../api/auth";

import "./CreateAccountForm.scss";

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showpwd, setShowPwd] = useState(false);
  const [passwordMode, setPasswordMode] = useState("password");
  const [password, setpassword] = useState(null);

  const handleSubmit = () => {
    navigate("/otp-verification");
  };

  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <div className="header-image">
            <img src={LoginLogo} alt="logo" width={200} height={70} />
          </div>
          <div className="step-text">Step 1\4</div>
          <div className="header-title">
            <div className="header-main-title">
              <span>Create an account </span>
            </div>
            <div className="header-sub-title">
              <div>
                Already have an account?
                <span className="create-account">
                  {" "}
                  <Link to={"/login"}>Log in</Link>
                </span>
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
                height={56}
              >
                <Validator className="custom-validator">
                  <RequiredRule message="Email Address is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="inputField">
              <TextBox
                label="Password"
                placeholder="Input text"
                value={password ? password : ""}
                mode={passwordMode}
                labelMode="static"
                stylingMode="outlined"
                height={56}
              >
                <TextBoxButton
                  name="password"
                  location="after"
                  options={{
                    icon: `${showpwd ? eyeopen : eyeclose}`,
                    stylingMode: "text",
                    onClick: () => {
                      setShowPwd(!showpwd);
                      setPasswordMode((prevPasswordMode) =>
                        prevPasswordMode === "text" ? "password" : "text"
                      );
                    },
                  }}
                />
                <Validator>
                  <RequiredRule message="Password is required" />
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
              onClick={() => handleSubmit()}
            />
          </div>
          {/* <div className="or-text">or</div>
          <div className="login-with-google">
            <Button
              text="Continue with Google"
              width={"100%"}
              height={"48px"}
              stylingMode="outlined"
              className="google-button"
            />
          </div> */}

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
