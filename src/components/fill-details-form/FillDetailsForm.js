import React from "react";
import { Button, CheckBox } from "devextreme-react";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { LoginImage, LoginLogo } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import { TextBox } from "devextreme-react/text-box";

const FillDetails = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/qr-code");
  };

  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <div className="header-image">
            <img src={LoginLogo} alt="logo" width={200} height={70} />
          </div>
          <div className="step-text">Step 3\4</div>
          <div className="header-title">
            <div className="header-main-title">
              <span>Fill in details </span>
            </div>
            <div className="header-sub-title">
              <div>What should we call you?</div>
            </div>
          </div>
          <div className="login-container-right-body">
            <div className="inputField">
              <TextBox
                label="Business Name"
                placeholder="Input text"
                labelMode="static"
                stylingMode="outlined"
              >
                <Validator className="custom-validator">
                  <RequiredRule message="Business Name is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="inputField">
              <TextBox
                label="Business Location"
                placeholder="Input text"
                labelMode="static"
                stylingMode="outlined"
              >
                <Validator>
                  <RequiredRule message="Business Location is required" />
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
};

export default FillDetails;
