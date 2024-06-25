import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { useRegisterState } from "../../Atoms/customHook";
import { requestOtp } from "../../api/registorApi";
import { toast } from "react-toastify";

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showpwd, setShowPwd] = useState(false);
  const [passwordMode, setPasswordMode] = useState("password");
  const [password, setpassword] = useState(null);

  const [registerUser, setRegisterUser] = useRegisterState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("step 1")
    const userEmail = registerUser.e_mail;
    const role = "company";

  
    const getOtp = await requestOtp(userEmail, role);
 console.log("step 2")
    console.log("getotp : ", getOtp);
    if (getOtp.response.Status === 400) {
      console.log("error")
      return console.log("Error in generating Otp");
    } else {
      console.log("susccess")
      navigate("/otp-verification");
    }

    return navigate("/otp-verification");
  };

  // useEffect(() => {
  //   console.log("This is my state : ", registerUser.e_mail);
  // }, [registerUser]);

  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <form
            method="post"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          >
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
                  onValueChanged={(e) =>
                    handleChange({ target: { name: "e_mail", value: e.value } })
                  }
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
                  onValueChanged={(e) =>
                    handleChange({
                      target: { name: "password", value: e.value },
                    })
                  }
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
                //useSubmitBehavior={true}
                onClick={ handleSubmit}
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
          </form>
        </div>
      </div>
      <div className="login-container-right">
        <img src={LoginImage} alt="Login" />
      </div>
    </div>
  );
}
