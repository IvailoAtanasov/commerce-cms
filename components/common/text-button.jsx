import React from "react";
import { Button, Box } from "@mui/material";

const TextButton = ({ onClick, children, position }) => {
  return (
    <Box sx={{ mt: 1 }} display="flex" justifyContent={position}>
      <Button
        onClick={onClick}
        variant="text"
        sx={{
          boxShadow: 0,
          "&:hover": { backgroundColor: "transparent" },
          backgroundColor: "transparent !important",
          color: "#ffffff",
          mt: 1,
          textTransform: "none",
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

export default TextButton;
