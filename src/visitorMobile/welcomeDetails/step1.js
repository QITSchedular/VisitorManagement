import React, { useEffect } from "react";
import "./step1.scss";
import { Button, TextBox } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useRegisterVisitor } from "../../Atoms/customHook";
import { requestOtp } from "../../api/registorApi";

export const Step1 = () => {
  const [registerVisitor , setRegisterVisitor] = useRegisterVisitor();
  const navigate = useNavigate();

// Handle Input Change 
  const handleInputChange =(e)=>{

    const { name, value } = e.target;
    setRegisterVisitor((prev)=>({
      ...prev ,
      [name]:value
    }))
  }
// Previous Button function
  const handlePreviousBtn = () => {
    navigate("/welcomevisitor");
  };

// Handle Continue Button
  const hanldeOnContinue = () => {
  console.log("yooo : ", registerVisitor.e_mail)
    if(registerVisitor.vname === ''){
      return console.log("Name required");
    }else if(registerVisitor.e_mail===""){
     return console.log("Email Required")
    }else if(registerVisitor.phone1===''){
      return console.log("Visitor Phone Number Required")
    }else if(registerVisitor.vcmpname===""){
      return console.log("Visitor Company Number Required")
    }else if(registerVisitor.vlocation===""){
      return  console.log("Visitor Company Location Required")
    }else{
      hanldeGetOtp();
     return navigate("/checkinotp");
    }

  };

  // Handle OTP
  const hanldeGetOtp = ()=>{
    const email = registerVisitor.e_mail
    const role = "visitor";
    const handleOtp = requestOtp(email ,role);

    if(handleOtp === true){
      return console.log("error")
    }

  }
  useEffect(()=>{
    console.log('registor : ' ,registerVisitor)

  }, [registerVisitor])
  return (
    <div className="Step1">
      <div className="backbtn">
        <i
          className="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
        ></i>
      </div>
      <div className="header-step">
        <div className="step-number">
          <span>Step 1/4</span>
        </div>
        <div className="welcome-text">
          <span>Welcome!</span> <span>Fill in the details</span>
        </div>
      </div>
      <div className="input-text">
        <TextBox
          label="Name"
          value={registerVisitor.vname}
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          onValueChanged={(e)=>
          handleInputChange({ target: { name: "vname", value: e.value } })
          }
        />
        <TextBox
          label="Email"
          value={registerVisitor.e_mail}
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          onValueChanged={(e)=>
          handleInputChange({ target: { name: "e_mail", value: e.value } })
          }
        />
        <TextBox
          label="Mobile Number"
          value={registerVisitor.phone1}
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          onValueChanged={(e)=>
          handleInputChange({ target: { name: "phone1", value: e.value } })
          }
        />
        <TextBox
          label="Company"
          value={registerVisitor.vcmpname}
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="step-textbox"
          onValueChanged={(e)=>
          handleInputChange({ target: { name: "vcmpname", value: e.value } })
          }
        />
        <TextBox
          label="Location"
          value={registerVisitor.vlocation}
          labelMode="static"
          stylingMode="outlined"
          height={"56px"}
          className="last-textbox"
          onValueChanged={(e)=>
          handleInputChange({ target: { name: "vlocation", value: e.value } })
          }
        />
      </div>
      <div className="btn-section">
        <Button
          text="Continue"
          width={"100%"}
          height={"44px"}
          onClick={hanldeOnContinue}
        />
      </div>
      <div className="already-text">
        <span> Already a visitor?</span>
        <span> Check Out</span>
      </div>
    </div>
  );
};
