import React, { useEffect, useState } from "react";
import {
  FormText,
  HeaderText,
} from "../../components/typographyText/TypograghyText";
import { Button, TextBox } from "devextreme-react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import AllowEntryPopup from "../../components/popups/allow-entry";
import RejectEntryPopup from "../../components/popups/reject-entry";
import { useLocation, useParams } from "react-router-dom";
import { getVisiotrCompanyWise, getVisitorDetailsApi } from "../../api/visitorApi";

const VistorsDetails = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupRejectVisible, setIsPopupRejectVisible] = useState(false);
  const [singleVisitor , setSingleVisitor] = useState([]);
  const [allVisitor , setAllVisitor] = useState([]);
  const [verifyData ,setVerifyData ] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const visitorId = queryParams.get('visitorId');
  const handleCloseRejectPopup = () => {
    setIsPopupRejectVisible(false);
  };
  const handleOpenRejectPopup = () => {

    setIsPopupRejectVisible(true);
    const authState =JSON.parse( sessionStorage.getItem('authState'));
    const company_id = authState.user.cmpid;

    setVerifyData({
      company_id:company_id,
      visitor_id:visitorId,
      reason:"",
      status:"R",
    })
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
    const authState =JSON.parse(sessionStorage.getItem('authState'));
    const cmp_id = authState.user.cmpid;
  console.log("user ID : " , authState.user)

    setVerifyData({
      company_id:cmp_id,
      visitor_id:visitorId,
      reason:"",
      status:"R",
    })
  };
  const detailedVisitor = async()=>{
    const authState =JSON.parse( sessionStorage.getItem('authState'));
    const cmp_id = authState.user.cmpid;
  console.log("user ID : " , authState.user)
    //return null
    const getData = await getVisiotrCompanyWise(cmp_id)
    console.log("Detailed Data : " ,getData.responseData)
     setAllVisitor (getData.responseData);
     const myallVisitor = getData.responseData;
    const visitor = myallVisitor.find(v => v.id === parseInt(visitorId));
    console.log("this is my Single Visitor : " , visitor)
     setSingleVisitor(visitor)
  }
  useEffect(()=>{
    detailedVisitor();

  },[])
  useEffect(()=>{
    console.log("SINGLE : " ,singleVisitor)
  },[singleVisitor])
  return (
    <>
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Reject Entry"
              stylingMode="outlined"
              width="auto"
              height={44}
              onClick={handleOpenRejectPopup}
            />
            <Button
              text="Allow Entry"
              width={140}
              height={44}
              className="button-with-margin"
              onClick={handleOpenPopup}
            />
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Personal Details" />
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Name</div>
            <div className="visitor-sub-header">{singleVisitor.vName}</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Mobile Number</div>
            <div className="visitor-sub-header">{singleVisitor.vPhone1}</div>
          </div>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Company</div>
            <div className="visitor-sub-header">{singleVisitor.vCmpname}</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Location</div>
            <div className="visitor-sub-header">{singleVisitor.vLocation}</div>
          </div>
        </div>
      </div>
      <div className="content-block dx-card">
        <div className="title-section">
          <FormText text="Other Details" />
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Person you want to meet</div>
            <div className="visitor-sub-header">{singleVisitor.cnctperson}</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Select Department</div>
            <div className="visitor-sub-header">{singleVisitor.deptName}</div>
          </div>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Purpose of Visit</div>
            <div className="visitor-sub-header">{singleVisitor.purposeofvisit}</div>
          </div>
          <div className="visitor-personal-data">
            <div className="visitor-header">Time Slot</div>
            <div className="visitor-sub-header">{singleVisitor.timeslot}</div>
          </div>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Carrying hardware</div>
            <div className="visitor-sub-header">{singleVisitor.anyhardware}</div>
          </div>
        </div>
      </div>
      <AllowEntryPopup
        header="Allow Entry"
        subHeader="Do you anything to add as a reasons? "
        allowEntry="Allow Entry"
        // saveFunction={handleSaveFunction}
        verifyData={verifyData}
        setVerifyData={setVerifyData}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />
      <RejectEntryPopup
        header="Reject Entry"
        subHeader="Do you anything to add as a reasons? "
        rejectEntry="Reject Entry"
        // saveFunction={handleSaveFunction}
        verifyData={verifyData}
        setVerifyData={setVerifyData}
        isVisible={isPopupRejectVisible}
        onHide={handleCloseRejectPopup}
      />
    </>
  );
};

export default VistorsDetails;
