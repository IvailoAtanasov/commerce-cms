import React, { useState, useEffect } from "react";

import AuthConteiner from "@/components/form-components/auth-form-container";
import IconInput from "@/components/form-components/icon-input";

import { SubmitButton } from "@/components/form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import { Grid } from "@mui/material";

import { useForm } from "react-hook-form";

import { InputAdornment } from "@mui/material";

import { signUpValidationSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/slices/authSlice";
import { signUp } from "@/store/thunks/authThunk";
import { useRouter } from "next/router";

import { setAuthUi } from "@/store/slices/uiSlice";
import TextButton from "../common/text-button";

const SignUp = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { userConfirmed, isLoading, error, success, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success && !userConfirmed) {
      dispatch(setAuthUi("confirmSignUp"));
    }
    dispatch(reset());
  }, [userConfirmed, success, dispatch, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit = async (data) => {
    dispatch(signUp(data));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthConteiner
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={error}
      success={success}
      message={message}
      title="Регистрация"
    >
      <IconInput control={control} name="email" label="Имейл" errors={errors}>
        <MailOutlineIcon
          sx={{
            color: "common.white",
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
              {showPassword ? (
                <VisibilityIcon
                  sx={{ color: "common.white", fontSize: "1rem" }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{ color: "common.white", fontSize: "1rem" }}
                />
              )}
            </InputAdornment>
          ),
        }}
      >
        <LockOpenIcon
          sx={{
            color: "common.white",
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
              {showPassword ? (
                <VisibilityIcon
                  sx={{ color: "common.white", fontSize: "1rem" }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{ color: "common.white", fontSize: "1rem" }}
                />
              )}
            </InputAdornment>
          ),
        }}
      >
        <ThumbUpOffAltIcon
          sx={{
            color: "common.white",
            mr: 2,
            my: 1,
            fontSize: "2rem",
          }}
        />
      </IconInput>
      <SubmitButton title="Създай профил" isLoading={isLoading} />
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <TextButton
            onClick={() => {
              dispatch(setAuthUi("signIn"));
            }}
            position="flex-end"
          >
            Вече имате профил?
          </TextButton>
        </Grid>
      </Grid>
    </AuthConteiner>
  );
};

export default SignUp;
