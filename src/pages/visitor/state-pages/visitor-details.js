import React, { useEffect, useMemo, useState } from "react";
import {
  FormText,
  HeaderText,
} from "../../../components/typographyText/TypograghyText";
import { Button, SelectBox, TextBox } from "devextreme-react";
import Breadcrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import { useRecoilState } from "recoil";
import { stateAtom, statusAtom } from "../../../contexts/atom";
import SendVerification from "../../../components/popups/send-verification";
import { useLocation, useNavigate } from "react-router-dom";
import { getVisitorDetailsApi, getVisitorEditedApi } from "../../../api/visitorApi";
import { toastDisplayer } from "../../../components/toastDisplayer/toastdisplayer";
import { checkOutVisitorApi } from "../../../api/mobileVisitorApi";
import { GettingDepratmentdata } from "../../../api/departmentAPi";
import EditSavePopup from "../../../components/popups/EditSavePopup";
import CustomLoader from "../../../components/customerloader/CustomLoader";

const getStatusColor = (state) => {
  const statusColors = {
    Approved: "#124d22",
    Pending: "#934908",
    Rejected: "#AD1820",
  };

  return statusColors[state];
};
const getStatusBackground = (state) => {
  const statusColors = {
    Approved: "rgba(18, 77, 34, 0.06)",
    Pending: "rgba(233, 115, 12, 0.06)",
    Rejected: "rgba(173, 24, 32, 0.06)",
  };
  return statusColors[state] || "#000";
};
const getStatusColors = (status) => {
  const statusColors = {
    "Check in": "#0D4D8B",
    "Check Out": "#AD1820",
  };

  return statusColors[status];
};
const getStatusBackgrounds = (status) => {
  const statusColors = {
    "Check in": "rgba(6, 84, 139, 0.06)",
    "Check Out": "rgba(173, 24, 32, 0.06)",
  };
  return statusColors[status] || "#fff";
};
const VisitorDetail = () => {
  const [status] = useRecoilState(statusAtom);
  const [state] = useRecoilState(stateAtom);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [visitorDetailbrief, setVisitorDetailbrief] = useState([]);
  const [visitorEmail, setVisitorEmail] = useState();
  const [placeholderTimeSlot, setPlaceholderTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [isEditPopupVisible  , setIsEditPopupVisible ] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [editingData  , setEditingData] =useState(
    {
      cnctperson: "",
      department_id: 1, 
      timeslot: "",
      anyhardware: "",
      purposeofvisit: "",
      company_id: null, 
      reason: "",
      createdby: null,
      vname: "",
      phone1: "",
      vcmpname: "",
      vlocation: "",
      e_mail: "",
      vavatar: ""
  }
  )
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const visitorId = queryParams.get("visitorId");

  const getVisitorDetails = async () => {
    setIsLoading(true);
    const authState = JSON.parse(sessionStorage.getItem("authState"));
    const cmp_id = authState.user.cmpid;
    const detail = await getVisitorDetailsApi(cmp_id, visitorId);

    if (detail.hasError === true) {
      setIsLoading(false);
      return toastDisplayer("error", `${detail.error}`);
    }
    const visitorData = detail.responseData;
    console.log("Visitor  : " ,visitorData);

    const cmpid = authState.user.cmpid;
    const companyUserId = authState.user.transid;
    setEditingData({
      cnctperson: visitorData.cnctperson ||"",
      department_id: visitorData.deptId || null, 
      timeslot: visitorData.timeslot || "",
      anyhardware: visitorData.anyhardware || "",
      purposeofvisit: visitorData.purposeofvisit || "",
      company_id:cmpid|| null, 
      reason: visitorData.reason || "",
      createdby: companyUserId,
      vname: "",
      phone1: "",
      vcmpname: "",
      vlocation: "",
      e_mail: "",
      vavatar: "", 
      vid:parseInt(visitorId)
    })

    setIsLoading(true)
    return setVisitorDetailbrief(detail.responseData);
  };

  useEffect(() => {
    getVisitorDetails();
  }, []);

  const [loading, setLoading] = useState(true);


  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const handleEditOpenPopup = () => {
    setIsEditPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleEditClosePopup = () => {
    setIsEditPopupVisible(false);
  };

  const handleEditVisitor = () => {
    setIsEdit(false);
  };

  const handleSaveVisitorEdit =async()=>{
    const editingRepsonse = await getVisitorEditedApi(editingData);

    if(editingRepsonse.hasError === true){
      return toastDisplayer("error" ,`${editingRepsonse.error}`);
    }

    toastDisplayer("success" ,`Edited Successfully `);

    return navigate("/Visitors");
  }

  const handleCheckOut = async () => {
    const authState = JSON.parse(sessionStorage.getItem("authState"));

    console.log("my Value : ", authState.user.cmpid);
    console.log("my email : ", visitorDetailbrief);
    const cmpid = authState.user.cmpid;

    const payload = {
      e_mail: visitorDetailbrief.vEmail,
      company_id: cmpid,
    };
    const checkOutVisitor = await checkOutVisitorApi(payload);
    if (checkOutVisitor.hasError === true) {
      return toastDisplayer("error", `${checkOutVisitor.error}`);
    }

    setIsPopupVisible(false);
    return toastDisplayer("success", "Visitor checked Out Successfully");
  };

  const getDepartmentdata = async () => {
    const authState = JSON.parse(sessionStorage.getItem("authState"));
    const cmpid = authState.user.cmpid;
    console.log("my cpmid : ", cmpid);
    const departmentData = await GettingDepratmentdata(cmpid);
    if (departmentData.hasError === true) {
      return console.log(
        "error while getting the department data",
        departmentData.error,
      );
    }
    return setDepartmentData(departmentData.repsonseData);
  };

  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setVisitorDetailbrief((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDateForPlaceholder = () => {
    const date = new Date(visitorDetailbrief.timeSlots);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Format the date and time
    const formattedDate = `${day} - ${month} - ${year}, ${hours} : ${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    setPlaceholderTimeSlot(formattedDate);
  };






  useEffect(() => {
    getDepartmentdata();
    getDateForPlaceholder();
  }, []);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const generateTimeSlots = (date) => {
    let slots = [];
    const now = new Date();

    // Get the current hour (0-23) from the Date object
    const currentHour = now.getHours();
    for (let i = currentHour; i < 24; i++) {
      const slotDate = new Date(date);
      slotDate.setHours(i, 0, 0, 0);
      const displayText = `${slotDate.getDate()} - ${
        slotDate.getMonth() + 1
      } - ${slotDate.getFullYear()}, ${slotDate.getHours() % 12 || 12} : 00 ${
        slotDate.getHours() >= 12 ? "pm" : "am"
      }`;
      slots.push({
        text: displayText,
        value: formatDateTime(slotDate),
      });
    }
    return slots;
  };
  const memoizedTimeSlots = useMemo(() => {
    const today = new Date();
    return generateTimeSlots(today);
  }, []);
  useEffect(() => {
    setTimeSlots(memoizedTimeSlots);
    console.log("slot: ", memoizedTimeSlots);
  }, [memoizedTimeSlots]);

  useEffect(()=>{
    console.log("This is my Data " , visitorDetailbrief)
  },[visitorDetailbrief])

  return (
    <>

      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            {visitorDetailbrief.state === "Approved" &&
              visitorDetailbrief.status === "Check in" && (
                <Button
                  text="Checkout"
                  width="auto"
                  height={44}
                  onClick={handleOpenPopup}
                />
              )}
            {visitorDetailbrief.state === "Rejected" &&
              visitorDetailbrief.addedBy === "Company" && (
                <>
                  {!isEdit && (
                    <Button
                      text="Send for Verify"
                      width="auto"
                      height={44}
                      onClick={handleEditOpenPopup}
                    />
                  )}

                  {isEdit && (
                    <Button
                      text="Edit"
                      width="auto"
                      height={44}
                      onClick={handleEditVisitor}
                    />
                  )}
                </>
              )}
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div className="content-block dx-card">
        <div className="title-section">
          <span
            className="header-state"
            style={{
              backgroundColor: getStatusBackground(visitorDetailbrief.state),
            }}
          >
            <span
              className="status-circle"
              style={{
                backgroundColor: getStatusColor(visitorDetailbrief.state),
              }}
            />
            <span data-type={visitorDetailbrief.state}>
              {visitorDetailbrief.state}
            </span>
          </span>
          <span
            className="header-status"
            style={{
              backgroundColor: getStatusBackgrounds(visitorDetailbrief.status),
            }}
          >
            <span
              className="status-circle"
              style={{
                backgroundColor: getStatusColors(visitorDetailbrief.status),
              }}
            />
            <span data-type={visitorDetailbrief.status}>
              {visitorDetailbrief.status}
            </span>
          </span>
        </div>
        <div className="visitor-personal-detail">
          <div className="visitor-personal-data">
            <div className="visitor-header">Reason</div>
            <div className="visitor-sub-header">
              {visitorDetailbrief.reason === "" ||
              visitorDetailbrief.reason === null
                ? "--"
                : visitorDetailbrief.reason}
            </div>
          </div>
        </div>
      </div>

      {visitorDetailbrief.state !== "Rejected" &&
        visitorDetailbrief.state !== "Rejected" && (
          <div className="content-block dx-card">
            <div className="title-section">
              <FormText text="Personal Details" />
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <div className="visitor-header">Name</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.vName}{" "}
                </div>
              </div>
              <div className="visitor-personal-data">
                <div className="visitor-header">Mobile Number</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.vPhone1 === ""
                    ? "--"
                    : visitorDetailbrief.vPhone1}
                </div>
              </div>
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <div className="visitor-header">Company</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.vCmpname === ""
                    ? "--"
                    : visitorDetailbrief.vCmpname}
                </div>
              </div>
              <div className="visitor-personal-data">
                <div className="visitor-header">Location</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.vLocation === ""
                    ? "--"
                    : visitorDetailbrief.vLocation}
                </div>
              </div>
            </div>
          </div>
        )}

      {visitorDetailbrief.state === "Rejected" &&
        visitorDetailbrief.state === "Rejected" && (
          <div className="content-block dx-card">
            <div className="title-section">
              <FormText text="Personal Details" />
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                {/* <div className="visitor-header">Name</div>
            <div className="visitor-sub-header">{visitorDetailbrief.vName} </div> */}
                <TextBox
                  label="Name"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  value={visitorDetailbrief.vName}
                  readOnly={isEdit}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "vname", value: e.value },
                    })
                  }
                />
              </div>
              <div className="visitor-personal-data">
                <TextBox
                  label="Mobile Number"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.vPhone1}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "vPhone1", value: e.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <TextBox
                  label="Company"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.vCmpname}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "vcmpname", value: e.value },
                    })
                  }
                />
              </div>
              <div className="visitor-personal-data">
                <TextBox
                  label="Location"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.vLocation}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "vlocation", value: e.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

      {visitorDetailbrief.state !== "Rejected" &&
        visitorDetailbrief.state !== "Rejected" && (
          <div className="content-block dx-card">
            <div className="title-section">
              <FormText text="Other Details" />
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <div className="visitor-header">Person you want to meet</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.cnctperson === ""
                    ? "--"
                    : visitorDetailbrief.cnctperson}
                </div>
              </div>
              <div className="visitor-personal-data">
                <div className="visitor-header">Select Department</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.deptName === ""
                    ? "--"
                    : visitorDetailbrief.deptName}
                </div>
              </div>
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <div className="visitor-header">Purpose of Visit</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.purposeofvisit === ""
                    ? "--"
                    : visitorDetailbrief.purposeofvisit}
                </div>
              </div>
              <div className="visitor-personal-data">
                <div className="visitor-header">Time Slot</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.timeslot === ""
                    ? "--"
                    : visitorDetailbrief.timeslot}
                </div>
              </div>
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <div className="visitor-header">Carrying hardware</div>
                <div className="visitor-sub-header">
                  {visitorDetailbrief.vCmpname === ""
                    ? "--"
                    : visitorDetailbrief.vCmpname}
                </div>
              </div>
            </div>
          </div>
        )}

      {visitorDetailbrief.state === "Rejected" &&
        visitorDetailbrief.state === "Rejected" && (
          <div className="content-block dx-card">
            <div className="title-section">
              <FormText text="Other Details" />
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <TextBox
                  label="Person You Want To Meet"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  value={visitorDetailbrief.cnctperson}
                  readOnly={isEdit}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "cnctperson", value: e.value },
                    })
                  }
                />
              </div>
              <div className="visitor-personal-data">
                <SelectBox
                  label="Select Department"
                  dataSource={departmentData}
                  placeholder={visitorDetailbrief.deptName}
                  labelMode="static"
                  displayExpr="deptname"
                  valueExpr="transid"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.deptName}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "department_id", value: e.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <TextBox
                  label="Purpose of visit"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.purposeofvisit}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "purposeofvisit", value: e.value },
                    })
                  }
                />
              </div>
              <div className="visitor-personal-data">
                <SelectBox
                  label="Time Slot"
                  labelMode="static"
                  placeholder={visitorDetailbrief.timeslot}
                  displayExpr="text"
                  dataSource={timeSlots}
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.timeslot}
                  selectedItem={visitorDetailbrief.timeslot}
                />
              </div>
            </div>
            <div className="visitor-personal-detail">
              <div className="visitor-personal-data">
                <TextBox
                  label="Carrying hardware"
                  labelMode="static"
                  stylingMode="outlined"
                  height={"56px"}
                  className="last-textbox"
                  readOnly={isEdit}
                  value={visitorDetailbrief.anyhardware}
                  onValueChanged={(e) =>
                    hanldeInputChange({
                      target: { name: "anyhardware", value: e.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

      <SendVerification
        header="Checkout Confirmation"
        subHeader="Are you sure you want visitor to checkout? "
        approval="Check Out"
        discard="Cancel"
        saveFunction={handleCheckOut}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />

      <EditSavePopup 
        header ="Edit Confirmation"
        subHeader ="Are you sure you want to send for approval? "
        approval="Save Edit"
        discard="Cancel"
        saveFunction={handleSaveVisitorEdit}
        isVisible ={isEditPopupVisible}
        onHide={handleEditClosePopup}
      />
    </>
  );
};

export default VisitorDetail;
