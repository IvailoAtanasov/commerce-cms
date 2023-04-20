import React, { useState } from "react";
import SignIn from "@/components/auth/sign-in";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "@/components/auth/sign-up";
import ForgottenPassword from "@/components/auth/forgottenPassword";
import ForgottenPasswordSubmit from "@/components/auth/forgottenPasswordSubmit";
import ConfirmSignUp from "@/components/auth/confirmSignUp";
const Auth = () => {
  const { type } = useSelector((state) => state.authUi);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)) , url(/images/login-background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "-1",
        overflow: "hidden !important",
      }}
    >
      {type === "signIn" && <SignIn />}
      {type === "signUp" && <SignUp />}
      {type === "forgottenPassword" && <ForgottenPassword />}
      {type === "forgottenPasswordSubmit" && <ForgottenPasswordSubmit />}
      {type === "confirmSignUp" && <ConfirmSignUp />}
    </Box>
  );
};

export default Auth;
