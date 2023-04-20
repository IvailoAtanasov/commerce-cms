import React, { useState, useEffect } from "react";

import AuthConteiner from "../form-components/auth-form-container";
import IconInput from "../form-components/icon-input";
import { SubmitButton } from "../form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

import { useForm } from "react-hook-form";

import { InputAdornment, Typography } from "@mui/material";

import { signInValidationSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/slices/authSlice";
import { setAuthUi } from "@/store/slices/uiSlice";
import { signIn } from "@/store/thunks/authThunk";
import { useRouter } from "next/router";
import IconButton from "@/components/form-components/icon-button";

import { Auth } from "aws-amplify";
import { Grid } from "@mui/material";

import TextButton from "../common/text-button";

const SignIn = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { isLoading, error, success, message, isSocialLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      dispatch(reset());
      router.push("/");
    }
  }, [success]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = async (data) => {
    dispatch(signIn(data));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  return (
    <AuthConteiner
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={error}
      success={success}
      message={message}
      title="Вход"
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

      <SubmitButton title="Вход" isLoading={isLoading} />

      <Typography
        sx={{ color: "#ffffff", mb: 2 }}
        variant="body1"
        align="center"
      >
        или
      </Typography>

      <IconButton
        title="Продължи с Google"
        isLoading={googleLoading}
        onClick={() => {
          setGoogleLoading(true);
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          }).catch((e) => console.log(e));
        }}
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
        isLoading={facebookLoading}
        onClick={() => {
          setFacebookLoading(true);
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Facebook,
          }).catch((e) => console.log(e));
        }}
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

      <Grid container>
        <Grid item xs={6}>
          <TextButton
            onClick={() => {
              dispatch(setAuthUi("forgottenPassword"));
            }}
            position="flex-start"
          >
            Забравена парола?
          </TextButton>
        </Grid>
        <Grid item xs={6}>
          <TextButton
            onClick={() => {
              dispatch(setAuthUi("signUp"));
            }}
            position="flex-end"
          >
            Нямате профил?
          </TextButton>
        </Grid>
      </Grid>
    </AuthConteiner>
  );
};

export default SignIn;
