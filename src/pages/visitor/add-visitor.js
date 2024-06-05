import React, { useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import {
  FormText,
  HeaderText,
} from "../../components/typographyText/TypograghyText";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { Button, SelectBox, TextBox } from "devextreme-react";
import SendVerification from "../../components/popups/send-verification";
import { PopUpIcon } from "../../assets";
import OtpPopup from "../../components/popups/otp-popup";

const AddVisitor = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleCloseOtpPopup = () => {
    setIsOtpPopupVisible(false);
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const mobileOption = {
    icon: PopUpIcon,
    onClick: () => {
      setIsOtpPopupVisible(true);
    },
  };
  return (
    <>
      <div className="content-block">
        <div className="navigation-header">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Send for Verify"
              width={140}
              height={44}
              className="button-with-margin"
              onClick={handleOpenPopup}
            />
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Personal Details" />
        </div>
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Name"
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
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Company"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <TextBox
              label="Location"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Other Details" />
        </div>
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Person you want to meet"
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
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Time Slot"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <TextBox
              label="Any Hardware"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
        <div className="personal-detail-form">
          <div className="form-input full-width">
            <TextBox
              label="Purpose of Visit"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
      </div>
      <SendVerification
        header="Send for Verification"
        subHeader="Are you sure you want to send for approval?"
        approval="Send for Verification"
        discard="Discard"
        // saveFunction={handleSaveFunction}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />
      <OtpPopup
        header="OTP Verification"
        subHeader="Sent to qitdemo@gmail.com"
        isVisible={isOtpPopupVisible}
        onHide={handleCloseOtpPopup}
      />
    </>
  );
};

export default AddVisitor;
