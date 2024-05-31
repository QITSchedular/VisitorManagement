import { Button, Popup } from "devextreme-react";
import React from "react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../typographyText/TypograghyText";
import "./send-verification.scss";

const SendVerification = ({
  header,
  subHeader,
  approval,
  discard,
  saveFunction,
  isVisible,
  onHide,
}) => {
  const handleSubmit = () => {
    saveFunction();
  };

  return (
    <>
      <Popup
        visible={isVisible}
        onHiding={onHide}
        width={"auto"}
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

        <div className="verification-footer">
          <Button
            text={discard}
            width={216}
            height={44}
            onClick={onHide}
            stylingMode="outlined"
          />
          <Button
            text={approval}
            width={216}
            height={44}
            onClick={handleSubmit}
            // disabled={isDisabled}
          />
        </div>
      </Popup>
    </>
  );
};

export default SendVerification;
