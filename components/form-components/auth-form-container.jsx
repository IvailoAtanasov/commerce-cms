import React from "react";
import { Box, Typography, Alert } from "@mui/material";

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
        transform: "translate(-50%, -50%)",
        position: "absolute",
        top: "50%",
        left: "50%",
        p: "50px 15px",
        width: "25rem",
        background: "rgba(255, 255, 255, 0.25)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(6.5px)",
        "&:-webkit-backdrop-filter": "blur(6.5px)",
        border: "1px solid rgba(255, 255, 255, 0.71)",

        "@media only screen and (max-width: 600px)": {
          width: "100vw",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: "0px",
          border: "none",
          p: "50px 0px",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          marginTop: "0.5rem",
          "@media only screen and (max-width: 600px)": {
            mt: "3rem",
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
        <Box sx={{ ml: 1.5, mr: 1.5 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthConteiner;
