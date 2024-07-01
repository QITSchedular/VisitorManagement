import React from "react";
import { HeaderText } from "../../components/typographyText/TypograghyText";
import { Button, DateBox, SelectBox, TextBox } from "devextreme-react";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { helpIcon } from "../../assets";
import "./log-report.scss";

const LogReportMain = () => {
  const userOptions = {
    icon: helpIcon,
    // onClick: () => {
    //   OtpBtnHandler();
    // },
  };
  return (
    <>
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="All the Log Reports" />
          </div>
        </div>
      </div>
      <div className="content-block dx-card">
        <div className="log-report-input">
          <div className="form-input">
            <DateBox
              label="From Date"
              height={56}
              displayFormat="dd-MM-yyyy"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
              showClearButton={true}
              // onValueChange={(value) => handleFromDateChange(new Date(value))}
            />
          </div>
          <div className="form-input">
            <DateBox
              label="To Date"
              height={56}
              displayFormat="dd-MM-yyyy"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
              showClearButton={true}
              // onValueChange={(value) => handleToDateChange(new Date(value))}
            />
          </div>
          <div className="form-input">
            <SelectBox
              label="Module"
              height={56}
              showClearButton={true}
              // items={moduleData}
              displayExpr="module"
              valueExpr="module"
              labelMode="static"
              stylingMode="outlined"

              // value={selectedModule}
              // onValueChanged={(e) => setSelectedModule(e.value)}
            />
          </div>
          <div className="form-input">
            <SelectBox
              label="Log Level"
              height={56}
              showClearButton={true}
              // items={logLevel}
              displayExpr="display"
              valueExpr="value"
              labelMode="static"
              stylingMode="outlined"
              // value={selectedLogLevel}
              // onValueChanged={(e) => setSelectedLogLevel(e.value)}
            />
          </div>
          <div className="form-input">
            <TextBox
              label="User"
              placeholder="Input"
              height={56}
              labelMode="static"
              stylingMode="outlined"
              // disabled={currentUser !== "Admin"}
            >
              <TextBoxButton
                name="popupSearch"
                location="after"
                options={userOptions}
              />
            </TextBox>
          </div>
          <Button
            style={{ marginTop: "15px" }}
            marginTop="10px"
            // height={56}
            // width={120}
            type="outlined"
            // onClick={handleSaveData}
            icon="search"
          />
        </div>
      </div>
    </>
  );
};

export default LogReportMain;
