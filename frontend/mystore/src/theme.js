import { createTheme } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import React from "react";

export const theme = createTheme({
  palette: {
    primary: {
      navbar:'#1f1f1f',
      black: "#121212",
      main: blueGrey[900],
      light: blueGrey[100],
      red: red[400],
    },
    secondary: {
      main: blueGrey[400],
    },
  },
});
