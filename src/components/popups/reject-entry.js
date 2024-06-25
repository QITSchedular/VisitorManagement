import { Button, Popup, TextBox } from "devextreme-react";
import React from "react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../typographyText/TypograghyText";
import { visitorDecision } from "../../api/visitorApi";
import { toastDisplayer } from "../toastDisplayer/toastdisplayer";
import { useNavigate } from "react-router-dom";

const RejectEntryPopup = ({
  header,
  rejectEntry,
  isVisible,
  onHide,
  subHeader,
  verifyData,
  setVerifyData,
}) => {
  const navigate = useNavigate();
  const handleAllowVisitor = async () => {
    console.log("value : ", verifyData);
    

    const decision = await visitorDecision(verifyData);

    if (decision.hasError === true) {
      return toastDisplayer("error", `${decision.error}`);
    }

    toastDisplayer("success", "Allowed Visitor");
    onHide();
    return navigate('/Verify-Visitors')
  };

  const handleReasonInput = (e) => {
    console.log("Input received");
    setVerifyData((prev) => ({
      ...prev,
      reason: e.value, // Access the input value from the event
    }));
  };

  return (
    <>
      <Popup
        visible={isVisible}
        onHiding={onHide}
        width={"25%"}
        height={"auto"}
        showCloseButton={false}
        dragEnabled={false}
        showTitle={false}
      >
        <div className="verification-popup-main">
          <PopupHeaderText text={header} />
          <div className="popup-subtext">
            <PopupSubText text={subHeader} />
          </div>

          <div className="popup-close-btn">
            <Button icon="close" onClick={onHide} />
          </div>
        </div>
        <div className="popup-input">
          <div className="form-input">
            <TextBox
              label="Reason"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
              onValueChanged={handleReasonInput}
              height={56}
            />
          </div>
        </div>
        <div className="popup-footer">
          <Button
            text={rejectEntry}
            height={44}
            onClick={handleAllowVisitor}
            className="full-width-button"
            stylingMode="outlined"
          />
        </div>
      </Popup>
    </>
  );
};

export default RejectEntryPopup;
