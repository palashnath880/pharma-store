"use client";

import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
});

export const myTheme = createTheme({
  palette: { primary: { main: "#009099" }, secondary: { main: "#283342" } },
  typography: {
    allVariants: {
      fontFamily: poppins.style.fontFamily,
    },
    fontSize: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          borderRadius: 9999,
          paddingTop: 10,
          paddingBottom: 10,
          lineHeight: "normal",
        },
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
    MuiTableCell: {
      defaultProps: {
        sx: {
          ["&.MuiTableCell-head"]: {
            fontWeight: 500,
            backgroundColor: "#009099",
            color: "#f2f2f2",
          },
        },
      },
    },
    MuiTableRow: {
      defaultProps: {
        sx: {
          ["&.MuiTableRow-root:nth-of-type(odd) .MuiTableCell-body"]: {
            backgroundColor: "#f2f2f2",
          },
        },
      },
    },
  },
});
