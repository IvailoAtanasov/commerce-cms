import React from "react";
import { Button } from "@mui/material";

export const SubmitButton = ({ title }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: "#A40030 !important",
        borderRadius: "0",
        "&:hover": {
          backgroundColor: "#480004 !important",
        },
      }}
    >
      {title}
    </Button>
  );
};
