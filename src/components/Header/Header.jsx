import React, { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import headerLogo from "./asset/logo.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userLocalData = JSON.parse(localStorage.getItem('userData'));

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/");
  };
  
  return (
    <Box
      sx={{
        height: "80px",
        display: "flex",
        padding: "16px 32px",
        justifyContent: "space-between",
        position: "fixed",
        top: "0",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {/* Link to homepage */}
      <Link to="/">
        <img src={headerLogo} alt="headerLogo" style={{ height: "50px" }} />
      </Link>

      {/* Profile picture with dropdown menu */}
      <div style={{ position: "relative" }}>
        <img
          src={userLocalData?.imageUrl}
          alt="StudentProfile"
          style={{ height: "50px", borderRadius:"60px", cursor: "pointer" }}
          onClick={handleProfileClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* Link to profile page */}
          <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
