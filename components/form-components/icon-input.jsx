import React from "react";
import { Input } from "./input";
import { Box } from "@mui/material";

const IconInput = ({ control, name, label, errors, children, ...rest }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      {children}
      <Input
        control={control}
        name={name}
        label={label}
        errors={errors}
        sx={{
          borderRadius: "0.25rem",
          mr: "1rem",
          fontWeight: "bold",
          ".css-rmuvfc-MuiInputBase-input-MuiInput-input: focus": {
            borderColor: "#ffffff",
            borderWidth: "2px",
          },
        }}
        variant="standard"
        {...rest}
      />
    </Box>
  );
};

export default IconInput;
