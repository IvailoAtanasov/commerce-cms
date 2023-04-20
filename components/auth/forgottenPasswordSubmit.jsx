import React, { useState, useEffect } from "react";

import AuthConteiner from "@/components/form-components/auth-form-container";
import IconInput from "@/components/form-components/icon-input";

import { SubmitButton } from "@/components/form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { Grid } from "@mui/material";

import { useForm } from "react-hook-form";

import { InputAdornment } from "@mui/material";

import { forgottenPasswordSubmitSchema } from "@/utils/validation-schema";
import { forgottenPasswordSubmit } from "@/store/thunks/authThunk";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/slices/authSlice";

import { setAuthUi } from "@/store/slices/uiSlice";
import TextButton from "../common/text-button";

const ForgottenPasswordSubmit = () => {
  const dispatch = useDispatch();

  const { isLoading, error, success, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      dispatch(setAuthUi("signIn"));
    }
    dispatch(reset());
  }, [success, dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
    resolver: yupResolver(forgottenPasswordSubmitSchema),
  });

  const onSubmit = async (data) => {
    dispatch(forgottenPasswordSubmit(data));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthConteiner
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={error}
      success={success}
      message={message}
      title="Заяви промяна на парола"
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
        label="Нова парола"
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
        label="Потвърди нова парола"
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
      <IconInput
        control={control}
        name="code"
        label="Код за потвърждение"
        errors={errors}
      >
        <FingerprintIcon
          sx={{
            color: "common.white",
            mr: 2,
            my: 1,
            fontSize: "2.2rem",
          }}
        />
      </IconInput>
      <SubmitButton title="Смени парола" isLoading={isLoading} />
      <Grid container>
        <Grid item xs={6}>
          <TextButton
            onClick={() => {
              dispatch(setAuthUi("signIn"));
            }}
            position="flex-start"
          >
            Отказ
          </TextButton>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </AuthConteiner>
  );
};

export default ForgottenPasswordSubmit;
