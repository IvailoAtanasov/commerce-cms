import React, { useEffect } from "react";

import AuthConteiner from "../form-components/auth-form-container";
import IconInput from "../form-components/icon-input";
import { SubmitButton } from "../form-components/submit-button";

import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useForm } from "react-hook-form";

import { forgottenPassowrdSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/slices/authSlice";
import { setAuthUi } from "@/store/slices/uiSlice";

import { forgottenPassword } from "@/store/thunks/authThunk";

import { Grid } from "@mui/material";
import TextButton from "../common/text-button";

const ForgottenPassword = () => {
  const dispatch = useDispatch();

  const { isLoading, error, success, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      dispatch(setAuthUi("forgottenPasswordSubmit"));
      dispatch(reset());
    }
  }, [success, dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgottenPassowrdSchema),
  });

  const onSubmit = async (data) => {
    dispatch(forgottenPassword(data));
  };

  return (
    <AuthConteiner
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={error}
      success={success}
      message={message}
      title="Възтановяване на парола"
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

      <SubmitButton title="Продължи" isLoading={isLoading} />
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

export default ForgottenPassword;
