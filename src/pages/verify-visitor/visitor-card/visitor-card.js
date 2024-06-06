import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "devextreme-react";
import "./visitor-card.scss";
import { useNavigate } from "react-router-dom";
import AllowEntryPopup from "../../../components/popups/allow-entry";
import RejectEntryPopup from "../../../components/popups/reject-entry";

const VisitorCard = ({ visitor, isExpanded, onToggleExpand }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Verify-Visitors/Details-of-Visitor");
  };
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
    <div className="visitor-card">
      <div className="visitor-header-main">
        <img src={visitor.profile} alt="visitor-profile" />
        <div className="visitor-deatils">
          <div className="visitor-company">{visitor.companyName}</div>
          <div className="visitor-name">{visitor.VisitorName}</div>
          <div className="visitor-address">{visitor.address}</div>
        </div>
        <div className="visitor-icon" onClick={handleClick}>
          <i className="ri-arrow-right-up-line"></i>
        </div>
      </div>
      <div className="visitor-meet-main">
        <div className="visitor-meet">
          <div className="visitor-meeting">{visitor.meetingWith}</div>
          <div className="visitor-time">{visitor.meetingTime}</div>
        </div>
        <div className="visitor-meet-icon">
          <i
            className={`ri-arrow-${isExpanded ? "up" : "down"}-s-line`}
            onClick={onToggleExpand}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="visitor-info-main">
            <div className="visitor-info">{visitor.deatils}</div>
          </div>
          <div className="visitor-footer">
            <Button
              text={"Reject Entry"}
              height={44}
              stylingMode="outlined"
              onClick={handleOpenRejectPopup}
            />

            <Button
              text={"Allow Entry"}
              height={44}
              onClick={handleOpenPopup}
            />
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
      )}
    </div>
  );
};

VisitorCard.propTypes = {
  visitor: PropTypes.shape({
    VisitorName: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    meetingWith: PropTypes.string.isRequired,
    meetingTime: PropTypes.string.isRequired,
    deatils: PropTypes.string.isRequired,
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
};

export default VisitorCard;
