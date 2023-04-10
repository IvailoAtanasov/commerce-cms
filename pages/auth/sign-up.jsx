import React, { useState } from "react";

import AuthConteiner from "@/components/form-components/auth-form-container";
import IconInput from "@/components/form-components/icon-input";
import AuthLayout from "@/layouts/AuthLayout";
import { SubmitButton } from "@/components/form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import { useForm } from "react-hook-form";

import { InputAdornment } from "@mui/material";

import { signUpValidationSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthConteiner
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title="Създай нов профил"
      icon={
        <LockPersonOutlinedIcon
          sx={{
            color: "#85001C",
            fontSize: "4rem",
          }}
        />
      }
    >
      <IconInput control={control} name="email" label="Имейл" errors={errors}>
        <MailOutlineIcon
          sx={{
            color: "action.active",
            mr: 2,
            my: 1,
            fontSize: "2rem",
          }}
        />
      </IconInput>
      <IconInput
        control={control}
        name="password"
        label="Парола"
        errors={errors}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          ),
        }}
      >
        <LockOpenIcon
          sx={{
            color: "action.active",
            mr: 2,
            my: 1,
            fontSize: "2rem",
          }}
        />
      </IconInput>
      <IconInput
        control={control}
        name="confirmPassword"
        label="Потвърди парола"
        errors={errors}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          ),
        }}
      >
        <ThumbUpOffAltIcon
          sx={{
            color: "action.active",
            mr: 2,
            my: 1,
            fontSize: "2rem",
          }}
        />
      </IconInput>
      <SubmitButton title="Създай" />
    </AuthConteiner>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(auth) {
  return <AuthLayout>{auth}</AuthLayout>;
};
