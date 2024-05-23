import { Routes, Route, Navigate } from "react-router-dom";
import { SingleCard } from "./layouts";
import {
  LoginForm,
  ResetPasswordForm,
  ChangePasswordForm,
  CreateAccountForm,
  OtpVerificationForm,
  FillDetailsForm,
  QRCodeForm,
} from "./components";

export default function UnauthenticatedContent() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <SingleCard title="Sign In">
            <LoginForm />
          </SingleCard>
        }
      />
      <Route
        path="/create-account"
        element={
          <SingleCard title="Sign Up">
            <CreateAccountForm />
          </SingleCard>
        }
      />
      <Route
        path="/reset-password"
        element={
          <SingleCard
            title="Reset Password"
            description="Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
          >
            <ResetPasswordForm />
          </SingleCard>
        }
      />

      <Route
        path="/otp-verification"
        element={
          <SingleCard>
            <OtpVerificationForm />
          </SingleCard>
        }
      />
      <Route
        path="/fill-details"
        element={
          <SingleCard>
            <FillDetailsForm />
          </SingleCard>
        }
      />
      <Route
        path="/qr-code"
        element={
          <SingleCard>
            <QRCodeForm />
          </SingleCard>
        }
      />
      <Route
        path="/change-password"
        element={
          <SingleCard>
            <ChangePasswordForm />
          </SingleCard>
        }
      />
      <Route path="*" element={<Navigate to={"/login"} />}></Route>
    </Routes>
  );
}
