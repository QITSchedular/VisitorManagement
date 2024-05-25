import React from "react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import {
  FormText,
  HeaderText,
} from "../../components/typographyText/TypograghyText";
import { Button, SelectBox, TextBox } from "devextreme-react";

const AddVisitor = () => {
  return (
    <>
      <div className="content-block">
        <div className="navigation-header">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Send for Verify"
              width={140}
              height={44}
              className="button-with-margin"
            />
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Personal Details" />
        </div>
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Name"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <TextBox
              label="Mobile Number"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Company"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <TextBox
              label="Location"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
      </div>
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Other Details" />
        </div>
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Person you want to meet"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <SelectBox
              label="Select Department"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
        <div className="personal-detail-form">
          <div className="form-input">
            <TextBox
              label="Time Slot"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
          <div className="form-input">
            <TextBox
              label="Any Hardware"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
        <div className="personal-detail-form">
          <div className="form-input full-width">
            <TextBox
              label="Purpose of Visit"
              placeholder="Input"
              labelMode="static"
              stylingMode="outlined"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVisitor;
