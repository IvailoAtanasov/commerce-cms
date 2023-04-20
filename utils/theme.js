import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    error: {
      main: "#ff8164",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          height: 40,
          fontSize: "16px",
        },

        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "none !important",
            webkitTextFillColor: "#ffffff !important",
            transition: "background-color 5000s ease-in-out 0s;",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          fontSize: "16px",
        },
      },
    },
  },
  transitions: {
    easing: {
      easeIn: "cubic-bezier(.17, .67, .83, .67)",
      sharp: "linear",
    },
  },
});
