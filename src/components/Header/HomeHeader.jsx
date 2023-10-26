import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import headerLogo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import studentProfilePhoto from "./asset/Ellipse 52.png";


const HomeHeader = () => {

  const navigate = useNavigate()
  const headerStyle = {
    height: "80px",
    display: "flex",
    padding: "16px 32px",
    justifyContent: "space-between",
    // border:"1px solid red",
    position: "fixed",
    top: "0",
    zIndex: "9000",
    width: "100%",
    backGround: "white",
    backgroundColor: "white"
  };
  const [loggedOut, setLoggedOut] = useState(localStorage.getItem("loggedOut"))
  const [isFirstLogin, setIsFirstLogin] = useState(localStorage.getItem("isFirstLogin"))

  return (
    <Box sx={headerStyle}>
      <img src={headerLogo} alt="headerLogo" style={{ height: "50px" }} />
      <Box style={{ display: "flex", gap: 20 }}>
        {/* <Button
          startIcon={<Add />}
          onClick={handleModalToggle}
          variant="outlined"
        >
          <Typography variant="subtitle2">Register as a Partner</Typography>
        </Button> */}
        {/* <Link to="/login"> */}
        <a href={`https://accounts.navgurukul.org/?loggedOut=${loggedOut}&isFirstLogin=${isFirstLogin}`}>
          <Button
            variant="contained"
          >
            <Typography variant="subtitle2">Login</Typography>
          </Button>
        </a>
        {/* </Link> */}
      </Box>
    </Box>
  );
};

export default HomeHeader;