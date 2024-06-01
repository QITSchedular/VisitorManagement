import React, { useState } from "react";
import {
  FormText,
  HeaderText,
} from "../../components/typographyText/TypograghyText";
import { Button, TextBox } from "devextreme-react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import AllowEntryPopup from "../../components/popups/allow-entry";
import RejectEntryPopup from "../../components/popups/reject-entry";

const VistorsDetails = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupRejectVisible, setIsPopupRejectVisible] = useState(false);
  const handleCloseRejectPopup = () => {
    setIsPopupRejectVisible(false);
  };
  const handleOpenRejectPopup = () => {
    setIsPopupRejectVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  return (
    <>
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Reject Entry"
              stylingMode="outlined"
              width="auto"
              height={44}
              onClick={handleOpenRejectPopup}
            />
            <Button
              text="Allow Entry"
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
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Name</div>
            <div className="visitor-sub-header">Input</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Mobile Number</div>
            <div className="visitor-sub-header">Input</div>
          </div>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Company</div>
            <div className="visitor-sub-header">Input</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Location</div>
            <div className="visitor-sub-header">Input</div>
          </div>
        </div>
      </div>
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Other Details" />
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Person you want to meet</div>
            <div className="visitor-sub-header">Input</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Select Department</div>
            <div className="visitor-sub-header">Input</div>
          </div>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Purpose of Visit</div>
            <div className="visitor-sub-header">Input</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Time Slot</div>
            <div className="visitor-sub-header">Input</div>
          </div>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Carrying hardware</div>
            <div className="visitor-sub-header">Input</div>
          </div>
        </div>
      </div>
      <AllowEntryPopup
        header="Allow Entry"
        subHeader="Do you anything to add as a reasons? "
        allowEntry="Allow Entry"
        // saveFunction={handleSaveFunction}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />
      <RejectEntryPopup
        header="Reject Entry"
        subHeader="Do you anything to add as a reasons? "
        rejectEntry="Reject Entry"
        // saveFunction={handleSaveFunction}
        isVisible={isPopupRejectVisible}
        onHide={handleCloseRejectPopup}
      />
    </>
  );
};

export default VistorsDetails;
