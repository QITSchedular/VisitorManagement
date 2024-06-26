import React, { useState } from "react";
 
const NotificationItem = ({ values, updateChkStatus }) => {
  const [showFullText, setShowFullText] = useState(false);
  const handleClickReadMore = () => {
    setShowFullText(!showFullText);
  };
  
  return (
    <div
      className={`notification${
            values.chk_status == "P" ? " unread" : ""
      }`}
      key={values.transid}
      onClick={() => {
        if(values.chk_status == "P"){
            updateChkStatus(values.transid);
        }
      }}
    >
      <div>
        <div className="notify-title">

          {showFullText ? values.notification_text : `${values.notification_text.slice(0, 50)}`}
          {values.notification_text.length > 50 && (
            <span
              className="read-more"
              style={{ color: "#4371B7" }}
              onClick={handleClickReadMore}
            >
              {showFullText ? " Read less" : " Read more"}
            </span>
          )}
        </div>
        <div className="notify-time">{values.n_date_time}</div>
      </div>
      {values.chk_status == "P" ? (
        <div className="notify-unread"></div>
      ) : ""}
    </div>
  );
};
 
export default NotificationItem;