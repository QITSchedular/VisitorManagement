import React, { useState } from "react";
import {
  FormText,
  HeaderText,
} from "../../../components/typographyText/TypograghyText";
import { Button } from "devextreme-react";
import Breadcrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import { useRecoilState } from "recoil";
import { stateAtom, statusAtom } from "../../../contexts/atom";
import SendVerification from "../../../components/popups/send-verification";

const getStatusColor = (state) => {
  const statusColors = {
    Approved: "#124d22",
    Pending: "#934908",
    Rejected: "#AD1820",
  };

  return statusColors[state];
};
const getStatusBackground = (state) => {
  const statusColors = {
    Approved: "rgba(18, 77, 34, 0.06)",
    Pending: "rgba(233, 115, 12, 0.06)",
    Rejected: "rgba(173, 24, 32, 0.06)",
  };
  return statusColors[state] || "#000";
};
const getStatusColors = (status) => {
  const statusColors = {
    "Check in": "#0D4D8B",
    "Check Out": "#AD1820",
  };

  return statusColors[status];
};
const getStatusBackgrounds = (status) => {
  const statusColors = {
    "Check in": "rgba(6, 84, 139, 0.06)",
    "Check Out": "rgba(173, 24, 32, 0.06)",
  };
  return statusColors[status] || "#fff";
};
const VisitorDetail = () => {
  const [status] = useRecoilState(statusAtom);
  const [state] = useRecoilState(stateAtom);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  return (
    <>
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            {state === "Approved" && status === "Check in" && (
              <Button
                text="Checkout"
                width="auto"
                height={44}
                onClick={handleOpenPopup}
              />
            )}
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div className="content-block dx-card">
        <div className="title-section">
          <span
            className="header-state"
            style={{ backgroundColor: getStatusBackground(state) }}
          >
            <span
              className="status-circle"
              style={{ backgroundColor: getStatusColor(state) }}
            />
            <span data-type={state}>{state}</span>
          </span>
          <span
            className="header-status"
            style={{ backgroundColor: getStatusBackgrounds(status) }}
          >
            <span
              className="status-circle"
              style={{ backgroundColor: getStatusColors(status) }}
            />
            <span data-type={status}>{status}</span>
          </span>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Name</div>
            <div className="visitor-sub-header">Input</div>
          </div>
        </div>
      </div>
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
      <SendVerification
        header="Checkout Confirmation"
        subHeader="Are you sure you want visitor to checkout? "
        approval="Check Out"
        discard="Cancel"
        // saveFunction={handleSaveFunction}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />
    </>
  );
};

export default VisitorDetail;
