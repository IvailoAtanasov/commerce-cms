import React from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

export const SubmitButton = ({ title, isLoading }) => {
  return (
    <Box position="relative">
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: isLoading ? grey[400] : "#000000 !important",
          borderRadius: "0",

          "&:hover": {
            backgroundColor: isLoading ? grey[400] : `${grey[900]}!important`,
          },
        }}
      >
        {title}
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: "#A40030",
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
