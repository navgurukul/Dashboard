import React, { useState, useEffect, useRef } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import headerLogo from "./asset/logo.png";
import studentProfilePhoto from "./asset/Ellipse 52.png";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleMenuClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div ref={menuRef} style={{ position: "relative" }}>
        <img
          src={studentProfilePhoto}
          alt="StudentProfile"
          style={{ height: "50px", cursor: "pointer" }}
          onClick={handleProfileClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* Link to profile page */}
          <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
