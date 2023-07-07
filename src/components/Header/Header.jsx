import React from 'react'
import { Box } from '@mui/material'
import headerLogo from './asset/logo.png'
import studentProfilePhoto from './asset/Ellipse 52.png'

const Header = () => {

const headerStyle = {
    height:"80px",
    display:'flex',
    padding:"10px 20px",
    justifyContent: "space-between",
    // position: "fixed",
    // top: "0"
}

  return (
    <Box
    sx={headerStyle}
    >
      <img src={headerLogo} alt="headerLogo"  style={{height: "50px"}} />
      <img src={studentProfilePhoto} alt="StudentProfile" style={{height: "50px"}}/>
    </Box>
  )
}

export default Header;
