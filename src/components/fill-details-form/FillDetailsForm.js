import React, { useEffect, useState } from "react";
import { Button, CheckBox } from "devextreme-react";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { LoginImage, LoginLogo } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import { TextBox } from "devextreme-react/text-box";
import { useRegisterState } from "../../Atoms/customHook";
import { registerUserApi } from "../../api/registorApi";
import { toastDisplayer } from "../toastDisplayer/toastdisplayer";

const FillDetails = () => {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useRegisterState("Empty");
  const [myCheck , setMyCheck] = useState("");

  // 8d2c2f98e4d98ba6a9b06c6a97ece92120cf8693816e0e831105cd8044f3dc0f
  const handleSubmit = async () => {

    console.log("my check  = " ,myCheck)
    if(!myCheck){
      console.log("here")
      return null;
    }
    if(!myCheck.blocation){
      console.log("here 1")
      return null;
    }
    if(!myCheck.bname){
      console.log("here 2")
      return null;
    }

    const getUserRegistered = await registerUserApi(registerUser);
    console.log(getUserRegistered);
    if(getUserRegistered.hasError === true){
      return toastDisplayer("error ", `${getUserRegistered.error}`)
    }
    if (
      getUserRegistered.response.status === 200 ||
      getUserRegistered.response.status === 201
    ) {
      sessionStorage.clear();
      sessionStorage.setItem(
        "qr-string",
        JSON.stringify(getUserRegistered.response.encodedString)
      );
      navigate("/qr-code");
      return console.log("User Registered Successfully ");
    } else {
      if (
        getUserRegistered.response.status === 400 &&
        getUserRegistered.response.StatusMsg ===
          "Email not found or OTP expired..!!"
      ) {
        console.log("yop");
        sessionStorage.removeItem("registerUser");
        setRegisterUser("");
        navigate("/create-account");
      }
      return console.log("error : ", getUserRegistered.response.StatusMsg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMyCheck((prev)=>({
      ...prev,
      [name]:value
    }))
    setRegisterUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("register user :  ", registerUser);
  }, [registerUser]);
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
                label="Company Name"
                placeholder="Input text"
                labelMode="static"
                stylingMode="outlined"
                height={56}
                value={registerUser.bname}
                onValueChanged={(e) =>
                  handleChange({ target: { name: "bname", value: e.value } })
                }
              >
                <Validator className="custom-validator">
                  <RequiredRule message="Company Name is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="inputField">
              <TextBox
                label="Company Location"
                placeholder="Input text"
                labelMode="static"
                height={56}
                stylingMode="outlined"
                value={registerUser.blocation}
                onValueChanged={(e) =>
                  handleChange({
                    target: { name: "blocation", value: e.value },
                  })
                }
              >
                <Validator>
                  <RequiredRule message="Company Location is required" />
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
