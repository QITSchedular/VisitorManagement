import React, { useEffect, useMemo, useState } from "react";
import "./step4.scss";
import { Button, SelectBox, TextBox, Validator } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useRegisterVisitor } from "../../Atoms/customHook";
import { GettingDepratmentdata } from "../../api/departmentAPi";
import { registerVisitorApi } from "../../api/mobileVisitorApi";
import { RequiredRule } from "devextreme-react/cjs/data-grid";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";

export const Step4 = () => {
  const navigate = useNavigate();
  const [registerVisitor, setRegisterVisitor] = useRegisterVisitor();
  const [departmentdataState, setDepartmentdataState] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const handlePreviousBtn = () => {
    navigate("/welcomestep3");
  };

  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterVisitor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAproval = async () => {
    console.log("payload : ", registerVisitor);

    if (!registerVisitor.cnctperson) {
      return console.log(
        "Mention person you want to meet:",
        registerVisitor.cnctperson,
      );
    } else if (!registerVisitor.department_id) {
      return console.log("Select the department");
    } else if (!registerVisitor.timeslot) {
      return console.log("Select the Time Slot");
    } else if (!registerVisitor.purposeofvisit) {
      return console.log("Please mention the purpose of visit");
    }

    console.log("registor : ", registerVisitor);
    const registor = await registerVisitorApi(registerVisitor);

    if (registor.hasError === true) {
      console.log("error : " , registor.error)
      return toastDisplayer("error",`${registor.error}`);
    }

    sessionStorage.removeItem("registerVisitor");
    return navigate("/Success");
  };

  const company_id = 2;
  const getDepartmentdata = async () => {
    const departmentData = await GettingDepratmentdata(company_id);
    if (departmentData.hasError === true) {
      return console.log(
        "error while getting the department data",
        departmentData.error,
      );
    }
    return setDepartmentdataState(departmentData.repsonseData);
  };

  const handleInputChange = (e) => {
    console.log({ target: { name: "timeslot", value: e.value } });
    setRegisterVisitor((prev) => ({
      ...prev,
      timeslot: e.value.value,
    }));
  };

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
    console.log("getting Data");
    setRegisterVisitor((prev) => ({
      ...prev,
      company_id: 2,
    }));
    getDepartmentdata();
  }, []);

  useEffect(() => {
    setTimeSlots(memoizedTimeSlots);
    console.log("slot: ", memoizedTimeSlots);
  }, [memoizedTimeSlots]);

  return (
    <div className="Step1">
    <form>
      <div className="backbtn">
        <i
          className="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
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
          onValueChanged={(e) =>
            hanldeInputChange({
              target: { name: "cnctperson", value: e.value },
            })
          }
        >
          <Validator>
            <RequiredRule message="Mention the person to meet" />
          </Validator>
        </TextBox>
        <SelectBox
          label="Select Department"
          dataSource={departmentdataState}
          displayExpr="deptname"
          valueExpr="transid"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          searchEnabled={true}
          onValueChanged={(e) =>
            hanldeInputChange({
              target: { name: "department_id", value: e.value },
            })
          }
        >
          <Validator>
            <RequiredRule message="Select the department" />
          </Validator>
        </SelectBox>
        <SelectBox
          label="Time Slot"
          dataSource={timeSlots}
          displayExpr="text"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          onValueChanged={handleInputChange}
        >
          <Validator>
            <RequiredRule message="Time Slot is required" />
          </Validator>
        </SelectBox>
        <TextBox
          label="Any Hardware"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="last-textbox"
          onValueChanged={(e) =>
            hanldeInputChange({
              target: { name: "anyhardware", value: e.value },
            })
          }
        >

        </TextBox>
        <TextBox
          label="Purpose of visit"
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="last-textbox"
          onValueChanged={(e) =>
            hanldeInputChange({
              target: { name: "purposeofvisit", value: e.value },
            })
          }
        >
          <Validator>
            <RequiredRule message="Mention the Purpose of visit" />
          </Validator>
        </TextBox>
      </div>
      <div className="btn-section">
        <Button
          text="Send For Approval"
          width={"100%"}
          height={"44px"}
          useSubmitBehavior={true}
          onClick={handleAproval}
        />
      </div>
      </form>
    </div>
  );
};
