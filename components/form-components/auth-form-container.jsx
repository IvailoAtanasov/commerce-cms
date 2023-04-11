import React from "react";
import { Box, Avatar, Typography, Alert } from "@mui/material";

const AuthConteiner = ({
  icon,
  title,
  children,
  handleSubmit,
  onSubmit,
  success,
  error,
  message,
}) => {
  return (
    <Box
      sx={{
        width: "25rem",
        mt: 1,
        backgroundColor: "rgba(255,255,255,0.13)",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        borderRadius: "10px",
        backdropFilter: "blur(10px) ",
        border: "2px solid rgba(255,255,255,0.1)",
        p: "50px 15px",

        "@media only screen and (max-width: 600px)": {
          width: "90vw",
          maxHeight: "100vh",
          backdropFilter: "none",
          backgroundColor: "transparent",
          border: "none",
          top: "40%",
          p: "50px 0px",
          m: 0,
        },
      }}
    >
      <Avatar
        sx={{
          height: "6rem",
          width: "6rem",
          position: "absolute",
          top: -8,
          left: "50%",
          right: 50,
          transform: "translate(-50%, -50%)",
          background: "#ffffff",
          "@media only screen and (max-width: 600px)": {
            top: 105,
          },
        }}
      >
        {icon}
      </Avatar>
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          marginTop: "0.5rem",
          "@media only screen and (max-width: 600px)": {
            mt: "10rem",
          },
        }}
      >
        {title}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        {error && (
          <Alert severity="error">
            {message.name === "NotAuthorizedException"
              ? "Невалидно потребителско име или парола"
              : message.name === "CodeMismatchException"
              ? "Грешен код за потвърждение"
              : message.name === "InvalidPasswordException"
              ? "Използвайте парола с повече от 8 символа, малки и големи букви и специални символи"
              : message.name === "UsernameExistsException"
              ? "Съществува потребител с такъв имейл адрес"
              : "Нещо се обърка... Опитай пак :)"}
          </Alert>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default AuthConteiner;
