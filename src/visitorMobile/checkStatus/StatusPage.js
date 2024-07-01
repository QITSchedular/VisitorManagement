import React from "react";
import Success from "../../assets/images/success.gif";
import Reject from "../../assets/images/Rejection.gif";
import Pending from "../../assets/images/Pending.gif";
import { Button } from "devextreme-react";
import "./checkstatus.scss";
import { useLocation, useNavigate } from "react-router-dom";
const StatusPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentStatus = queryParams.get('status');
  //const currentStatus = "R";
  const navigate = useNavigate();
  return (
    <div className="StatusPage">
      <div className="dynamic-content">
      {currentStatus === "A" &&(
        <div className="success">
          <span style={{marginBottom:"8px"}}>Congratulations! It got approved.</span>
          <span>You can enter into premises</span>
        </div>
      )}
      {currentStatus === "P" &&(
        <div className="Pending">
          <span style={{marginBottom:"8px"}}>No decision taken yet! It’s pending.</span>
          <span>Can you please wait for a while?</span>
        </div>
      )}

      {currentStatus === "R" &&(
        <div className="Reject">
          <span style={{marginBottom:"8px"}}>Sorry! It got rejected.</span>
          <span>The person you are trying to meet is not available.</span>
        </div>
      )}


        {currentStatus === "A" && (
          <div className="approved">
            <img src={Success} alt="Success" />
          </div>
        )}

        {currentStatus === "P" && (
          <div className="pending">
            <img src={Pending} alt="Reject" />
          </div>
        )}

        {currentStatus === "R" && (
          <div className="rejected">
            <img src={Reject} alt="Pending" />
          </div>
        )}

        {currentStatus !== "A" &&(
          <div className="button">
          <Button text="Go back to home page" height={"44px"} width={"100%"} onClick={()=>navigate('/welcomevisitor')}/>
        </div>
        )}

      </div>
    </div>
  );
};

export default StatusPage;
