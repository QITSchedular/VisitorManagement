import { Button, Popup, TextBox } from "devextreme-react";
import React from "react";
import {
  PopupHeaderText,
  PopupSubText,
} from "../typographyText/TypograghyText";

const AllowEntryPopup = ({
  header,
  allowEntry,
  isVisible,
  onHide,
  subHeader,
}) => {
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
              height={56}
            />
          </div>
        </div>
        <div className="popup-footer">
          <Button
            text={allowEntry}
            height={44}
            onClick={onHide}
            className="full-width-button"
          />
        </div>
      </Popup>
    </>
  );
};

export default AllowEntryPopup;
