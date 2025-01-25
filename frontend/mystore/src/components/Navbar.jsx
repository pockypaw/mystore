import React from "react"; // Add this import
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { blueGrey } from "@mui/material/colors";

const Navbar = ({ colorMode, toggleColorMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For responsiveness

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colorMode === "light" ? blueGrey[100] : blueGrey[900],
        marginBottom:'8px'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundClip: "text",
              color: colorMode === "light" ? "#000" : "#fff",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              MyStore 🛒
            </Link>
          </Typography>

          <div>
            <Link to="/create">
              <Button
                variant="contained"
                sx={{
                  fontSize: 18,
                  backgroundColor:
                    colorMode === "light" ? blueGrey[900] : blueGrey[100],
                }}
              >
                <FaPlusSquare
                  sx={{
                    color:
                      colorMode === "light" ? blueGrey[100] : blueGrey[900],
                  }}
                />
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={toggleColorMode}
              sx={{
                marginLeft: 2,
                fontSize: 18,
                color: colorMode === "light" ? blueGrey[100] : blueGrey[900],
                backgroundColor:
                  colorMode === "light" ? blueGrey[900] : blueGrey[100],
              }}
            >
              {colorMode === "light" ? <IoMoon /> : <LuSun />}
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
