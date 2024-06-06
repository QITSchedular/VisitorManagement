import { Button, SelectBox, TextBox } from "devextreme-react";
import React, { useState } from "react";
import { HeaderText } from "../../../components/typographyText/TypograghyText";
import "./add-user.scss";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { PopUpIcon } from "../../../assets";
import OtpPopup from "../../../components/popups/otp-popup";

const AddUser = () => {
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false);

  const mobileOption = {
    icon: PopUpIcon,
    onClick: () => {
      setIsOtpPopupVisible(true);
    },
  };
  const handleCloseOtpPopup = () => {
    setIsOtpPopupVisible(false);
  };
  return (
    <>
      <div className="dx-card" style={{ marginTop: "16px" }}>
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Save Details"
              width={140}
              height={44}
              className="button-with-margin"
              // onClick={handleClick}
            />
          </div>
        </div>
        <div className="add-user-form">
          <div className="form-input">
            <SelectBox
              label="Select User Type"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <TextBox
              label="Name"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
        <div className="add-user-form">
          <div className="form-input">
            <TextBox
              label="Password"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input popup-textbox">
            <TextBox
              label="Mobile Number"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            >
              <TextBoxButton
                name="popupSearch"
                location="after"
                options={mobileOption}
              />
            </TextBox>
          </div>
        </div>
        <div className="add-user-form">
          <div className="form-input">
            <TextBox
              label="Email Address"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <SelectBox
              label="Select Department"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
        <div className="add-user-form">
          <div className="form-input">
            <SelectBox
              label="Select Gender"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
      </div>
      <OtpPopup
        header="OTP Verification"
        subHeader="Sent to qitdemo@gmail.com"
        isVisible={isOtpPopupVisible}
        onHide={handleCloseOtpPopup}
      />
    </>
  );
};

export default AddUser;
