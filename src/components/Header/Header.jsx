import React, { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import headerLogo from "./asset/logo.png";
// import studentProfilePhoto from "./asset/unnamed.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsMenuOpen(true);
  };
  const userLocalData=JSON.parse(localStorage.getItem('AUTH'))

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogOut = () => {
    setIsMenuOpen(false);
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
          src={userLocalData?.user?.profile_picture}
          alt="StudentProfile"
          style={{ height: "50px", borderRadius:"60px", cursor: "pointer" }}
          onClick={handleProfileClick}
        />
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={{ top: 70, left: 1500 }} // Adjust the position as needed
          open={isMenuOpen}
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
