import React from "react";
import { LoginImage, LoginLogo } from "../../assets";
import { Button } from "devextreme-react";

const ResetLinkPassword = () => {
  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <div className="header-image">
            <img src={LoginLogo} alt="logo" width={200} height={70} />
          </div>
          <div className="header-title">
            <div className="header-main-title">
              <span>Request Send </span>
            </div>
            <div className="header-sub-title">
              <div>Send request to admin to change the password</div>
            </div>
          </div>
          <div className="login-container-right-footer">
            <Button
              text="Send Request Password Change"
              width={"100%"}
              height={"48px"}
              useSubmitBehavior={true}
              // onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="login-container-right">
        <img src={LoginImage} alt="Login" />
      </div>
    </div>
  );
};

export default ResetLinkPassword;
