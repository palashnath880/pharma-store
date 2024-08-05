"use client";

import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
});

export const myTheme = createTheme({
  palette: { primary: { main: "#009099" } },
  typography: {
    allVariants: {
      fontFamily: poppins.style.fontFamily,
    },
    fontSize: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: { borderRadius: 9999, paddingTop: 10, paddingBottom: 10 },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          sx: {
            ["&.MuiInputLabel-shrink"]: {
              left: 0,
            },
            left: 8,
          },
        },
        sx: {
          ["& .MuiInputBase-root"]: {
            borderRadius: 9999,
          },
        },
        inputProps: {
          style: {
            paddingLeft: 20,
          },
        },
      },
    },
  },
});
