import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";

export const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
      light: blueGrey[100],
    },
    secondary: {
      main: blueGrey[400],
    },
  },
});
