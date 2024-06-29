import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "devextreme-react";
import "./visitor-card.scss";
import { useNavigate, useParams } from "react-router-dom";
import AllowEntryPopup from "../../../components/popups/allow-entry";
import RejectEntryPopup from "../../../components/popups/reject-entry";
import Visitor from "../../../assets/images/visitor.png";

const VisitorCard = ({ visitor, isExpanded, onToggleExpand }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupRejectVisible, setIsPopupRejectVisible] = useState(false);
  const [verifyData, setVerifyData] = useState(null);
  const navigate = useNavigate();

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const date = formatDateTime(visitor.timeslot);

  const handleClick = () => {
    console.log("vistor : ", visitor.id);
    const visitorId = visitor.id;
    navigate(`/Verify-Visitors/Details-of-Visitor?visitorId=${visitorId}`);
  };

  const handleCloseRejectPopup = () => {
    setIsPopupRejectVisible(false);
  };
  const handleOpenRejectPopup = () => {
    setIsPopupRejectVisible(true);
    const authState = JSON.parse(sessionStorage.getItem("authState"));
    console.log("authState : ", authState.user.cmpid);
    const company_id = authState.user.cmpid;

    setVerifyData({
      company_id: company_id,
      visitor_id: visitor.id,
      reason: "",
      status: "R",
    });
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
    const authState = JSON.parse(sessionStorage.getItem("authState"));
    console.log("authState : ", authState.user.cmpid);
    const company_id = authState.user.cmpid;
    setVerifyData({
      company_id: company_id,
      visitor_id: visitor.id,
      reason: "",
      status: "A",
    });
  };

  const handleGetDetailUser = () => {
    console.log("clicked");
  };

  return (
    <div className="visitor-card">
      <div className="visitor-header-main">
        {visitor.vavatar ? (
          <img src={visitor.vavatar} alt="visitor-profile" />
        ) : (
          <img src={Visitor} alt="visitor-profile" />
        )}
        <div className="visitor-deatils">
          <div className="visitor-company">{visitor.vCmpname}</div>
          <div className="visitor-name">{visitor.vName}</div>
          <div className="visitor-address">{visitor.vLocation}</div>
        </div>
        <div className="visitor-icon" onClick={handleClick}>
          <i className="ri-arrow-right-up-line"></i>
        </div>
      </div>
      <div className="visitor-meet-main">
        <div className="visitor-meet">
          <div className="visitor-meeting">
            <span className="meeting-with">Will be Meeting to</span>
            {visitor.cnctperson}
          </div>
          <div className="visitor-time">{date}</div>
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
            <div className="visitor-info">{visitor.purposeofvisit}</div>
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
            setVerifyData={setVerifyData}
            verifyData={verifyData}
            dessionStatus={"A"}
            isVisible={isPopupVisible}
            onHide={handleClosePopup}
          />
          <RejectEntryPopup
            header="Reject Entry"
            subHeader="Do you anything to add as a reasons? "
            rejectEntry="Reject Entry"
            // saveFunction={handleSaveFunction}.
            setVerifyData={setVerifyData}
            verifyData={verifyData}
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
