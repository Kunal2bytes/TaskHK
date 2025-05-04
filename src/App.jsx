
import React from "react";
import { ToastContainer, toast } from 'react-toastify';  // Import toastify
import { useNavigate } from "react-router-dom";
import Section from './component/Section';
import SignInForm from "./component/SignIn";
import LeftSide from "./component/LeftSide";
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the styles

function LoginPage() {

  return (
    <>
      <LeftSide />
      <ToastContainer />  {/* Add ToastContainer */}
      {/* <SignInForm /> */}
    </>
  );
}

export function AdminPage() {
  return <h2>Welcome, Admin!</h2>;
}

export function UserPage() {
  return <Section />;
}

export default LoginPage;
