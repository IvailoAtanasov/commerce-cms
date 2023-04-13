import React, { useState, useEffect } from "react";

import AuthConteiner from "@/components/form-components/auth-form-container";
import IconInput from "@/components/form-components/icon-input";
import AuthLayout from "@/layouts/AuthLayout";
import { SubmitButton } from "@/components/form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useForm } from "react-hook-form";

import { InputAdornment, Typography } from "@mui/material";

import { signInValidationSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/slices/authSlice";
import { signIn } from "@/store/thunks/authThunk";
import { useRouter } from "next/router";
import IconButton from "@/components/form-components/icon-button";

import { Grid, Box } from "@mui/material";

import Link from "next/link";

const SignIn = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { isLoading, error, success, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      dispatch(reset());
    }
  }, [success, dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = async (data) => {
    dispatch(signIn(data));
  };

  const [showPassword, setShowPassword] = useState(false);

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
        isLoading={isLoading}
        onClick={() => console.log("google")}
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

      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ mt: 1 }}>
            <Link href="/auth/forgotten-password" style={{ color: "#ffffff" }}>
              Забравена парола?
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ mt: 1 }} display="flex" justifyContent="flex-end">
            <Link href="/auth/sign-up" style={{ color: "#ffffff" }}>
              Нямате профил?
            </Link>
          </Box>
        </Grid>
      </Grid>
    </AuthConteiner>
  );
};

export default SignIn;

SignIn.getLayout = function getLayout(auth) {
  return <AuthLayout>{auth}</AuthLayout>;
};
