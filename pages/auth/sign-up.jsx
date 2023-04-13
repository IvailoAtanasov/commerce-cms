import React, { useState, useEffect } from "react";

import AuthConteiner from "@/components/form-components/auth-form-container";
import IconInput from "@/components/form-components/icon-input";
import AuthLayout from "@/layouts/AuthLayout";
import { SubmitButton } from "@/components/form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useForm } from "react-hook-form";

import { InputAdornment, Typography } from "@mui/material";

import { signUpValidationSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/slices/authSlice";
import { signUp } from "@/store/thunks/authThunk";
import { useRouter } from "next/router";
import IconButton from "@/components/form-components/icon-button";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const SignUp = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { userConfirmed, isLoading, error, success, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log("userCon", userConfirmed);
    if (success && !userConfirmed) {
      router.push("/auth/confirm-sign-up");
    }
    dispatch(reset());
  }, [userConfirmed, success, dispatch, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit = async (data) => {
    dispatch(signUp(data));
  };

  const [showPassword, setShowPassword] = useState(false);

  const googleLogin = async () => {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    })
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
      <Typography
        sx={{ color: "#ffffff", mb: 2 }}
        variant="body1"
        align="center"
      >
        или
      </Typography>

      <IconButton
        title="Продължи с Google"
        isLoading={isLoading}
        onClick={googleLogin}
        startIcon={
          <GoogleIcon
            sx={{
              position: "absolute",
              color: "#000000",
              left: "1rem",
              bottom: "20%",
            }}
          />
        }
      />

      <IconButton
        title="Продължи с Facebook"
        isLoading={isLoading}
        onClick={() => console.log("google")}
        startIcon={
          <FacebookIcon
            sx={{
              position: "absolute",
              color: "#000000",
              left: "1rem",
              bottom: "20%",
            }}
          />
        }
      />
    </AuthConteiner>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(auth) {
  return <AuthLayout>{auth}</AuthLayout>;
};
