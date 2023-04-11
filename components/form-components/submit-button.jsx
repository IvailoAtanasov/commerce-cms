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
        backgroundColor: "#85001C !important",
        borderRadius: "0",

        "&:hover": {
          backgroundColor: "#A40030 !important",
        },
      }}
    >
      {title}
    </Button>
  );
};
