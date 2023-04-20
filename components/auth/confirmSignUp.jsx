import React, { useEffect } from "react";

import AuthConteiner from "@/components/form-components/auth-form-container";
import IconInput from "@/components/form-components/icon-input";

import { SubmitButton } from "@/components/form-components/submit-button";

import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import { useForm } from "react-hook-form";

import { ConfirmSignUpSchema } from "@/utils/validation-schema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";

import { confirmSignUp, resendConfirmation } from "@/store/thunks/authThunk";
import { useRouter } from "next/router";

import { Typography, Alert } from "@mui/material";
import TextButton from "../common/text-button";

const ConfirmSignUp = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { username, isLoading, error, success, message, resendSuccess } =
    useSelector((state) => state.auth);

  const email = username;

  const onSubmit = async (data) => {
    data["username"] = email;

    dispatch(confirmSignUp(data));
  };

  const resendCode = async () => {
    dispatch(resendConfirmation(email));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(ConfirmSignUpSchema),
  });

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [username, success, router, resendSuccess]);

  return (
    <AuthConteiner
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={error}
      success={success}
      message={message}
      title="Потвърди имейл"
      icon={
        <LockPersonOutlinedIcon
          sx={{
            color: "#85001C",
            fontSize: "4rem",
          }}
        />
      }
    >
      {resendSuccess && (
        <Alert severity="success">Изпратихме нов код за потвърждение</Alert>
      )}
      <Typography
        variant="h6"
        color="common.white"
        sx={{ mt: 2, textAlign: "center" }}
      >
        Моля, въведи кодa за потвърждение, получен на посочения от теб имейл
        адрес.
      </Typography>

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
      <SubmitButton title="Потвърди" isLoading={isLoading} />

      <TextButton onClick={resendCode} position="flex-start">
        Изпрати нов код за верификация
      </TextButton>
    </AuthConteiner>
  );
};

export default ConfirmSignUp;
