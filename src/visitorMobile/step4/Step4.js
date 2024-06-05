import React from 'react'
import './step4.scss'
import { Button, SelectBox, TextBox } from 'devextreme-react'

export const Step4 = () => {
  return (
    <div className="Step1">
    <div className="backbtn">
      <i
        class="ri-arrow-left-line"
        style={{ fontSize: "20px" }}
       // onClick={handlePreviousBtn}
      ></i>
    </div>
    <div className="header-step">
      <div className="step-number">
        <span>Step 4/4</span>
      </div>
      <div className="welcome-text">
        <span>Other Details!</span> 
      </div>
    </div>
    <div className="input-text">
      <TextBox
        label="Person you want to meet"
        labelMode="static"
        stylingMode="outlined"
        height={"56px"}
        className="step-textbox"
      />
      <SelectBox
        label="Select Department"
        labelMode="static"
        stylingMode="outlined"
        height={"56px"}
        className="step-textbox"
      />
      <TextBox
        label="Time Slot"
        labelMode="static"
        stylingMode="outlined"
        height={"56px"}
        className="step-textbox"
      />
      <TextBox
        label="Any Hardware"
        labelMode="static"
        stylingMode="outlined"
        height={"56px"}
        className="last-textbox"
      />

<TextBox
        label="Purpose of visit"
        labelMode="static"
        stylingMode="outlined"
        height={"56px"}
        className="last-textbox"
      />
    </div>
    <div className="btn-section">
      <Button
        text="Send For Approval"
        width={"100%"}
        height={"44px"}
       // onClick={hanldeOnContinue}
      />
    </div>
 
  </div>
  )
}
