import React from "react";
import { Button, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";

const IconButton = ({ title, isLoading, onClick, ...rest }) => {
  return (
    <Box position="relative">
      <Button
        onClick={onClick}
        fullWidth
        variant="contained"
        sx={{
          mb: 2,
          color: "#000000",
          backgroundColor: isLoading ? grey[400] : "#ffffff !important",
          borderRadius: "0",
          "&:hover": {
            backgroundColor: isLoading ? grey[400] : "#999999 !important",
          },
        }}
        {...rest}
      >
        {title}
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: "#000000",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-10px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default IconButton;
