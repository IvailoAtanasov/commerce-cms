import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";

const mode = "light"; //TODO implement redux store for theme mode

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: "#85001C", //colors.primary[500]
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
            loginForm: {
              main: "#478778",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
      gradient: {
        main: "-webkit-linear-gradient(#67B26F, #4ca2cd)",
      },
    },
    transitions: {
      easing: {
        easeIn: "cubic-bezier(.17, .67, .83, .67)",
        sharp: "linear",
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            height: 40,
            fontSize: "18px",
          },

          input: {
            "&:-webkit-autofill": {
              "-webkit-box-shadow": "none !important",
              "-webkit-text-fill-color": "#ffffff !important",
              transition: "background-color 5000s ease-in-out 0s;",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            fontSize: "18px",
          },
        },
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
