import React, { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import headerLogo from "./asset/logo.png";
import studentProfilePhoto from "./asset/unnamed.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogOut = () => {
    setIsMenuOpen(false);
    localStorage.clear();
    navigate("/");
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
        zIndex: "9000"
      }}
    >
      {/* Link to homepage */}
      <Link to="/">
        <img src={headerLogo} alt="headerLogo" style={{ height: "50px" }} />
      </Link>

      {/* Profile picture with dropdown menu */}
      <div style={{ position: "relative" }}>
        <img
          src={studentProfilePhoto}
          alt="StudentProfile"
          style={{ height: "60px", borderRadius:"60px", cursor: "pointer" }}
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
