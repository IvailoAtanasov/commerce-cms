import React from "react";

import AuthLayout from "@/layouts/AuthLayout";

const Auth = () => {
  return <></>;
};

export default Auth;

Auth.getLayout = function getLayout(auth) {
  return <AuthLayout>{auth}</AuthLayout>;
};
