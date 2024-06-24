import React from "react";
import "./welcome.scss";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();
  const hanldeCheckIn = () => {
    navigate("/welcomestep1");
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };
  const handleCheckStatus =() =>{
    navigate('/checkstatus')
  }
  return (
    <div className="outer-container">
      {/* <div className="upper-part"></div> */}
      <div className="lower-part">
        <div className="welcome-note">
          <div className="title">
            <span>Welcome Aawjo</span>
          </div>
          <div className="subtitle">
            <span>Heya! </span>
            <span>What do you want to do?</span>
          </div>
        </div>
        <div className="button-section">
          <Button
            text="Check In"
            className="checkInBtn"
            onClick={hanldeCheckIn}
          />
          <Button
            text="Check Out"
            className="CheckOutBtn"
            onClick={handleCheckout}
          />
          <div className="welcome-footer">
            <span>Already applied?</span>
            <span className="check-status" onClick={handleCheckStatus}>Check Status</span>
          </div>
        </div>
      </div>
    </div>
  );
};
