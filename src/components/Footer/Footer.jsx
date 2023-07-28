import React from "react";
import { Box, Typography } from "@mui/material";
import headerLogo from "../../assets/logo.png";
import FacebookIcon from "./assets/facebook.svg"
import Linkedincon from "./assets/linkedIn.svg"
import TwitterIcon from "./assets/twitter.svg"
const Footer = () => {
  const headerStyle = {
    height: "80px",
    display: "flex",
    padding: "20px 32px",
    justifyContent: "space-around",
    backgroundColor: "primary.light",
    alignItems: "center",
    // border:"1px solid red",
    width: "100%",
    marginTop: 10,
    backGround: "white",
  };
  const socialMediaLink = {
    facebook: "https://www.facebook.com/navgurukul/",
    linkedIn: "https://www.linkedin.com/company/navgurukul/",
    twitter: "https://twitter.com/navgurukul",
  };

  return (
    <Box sx={headerStyle}>
      <img src={headerLogo} alt="headerLogo" style={{ height: "50px" }} />
      <Typography variant="body2">
        © 2022 NavGurukul Foundation for Social Welfare
      </Typography>
      <Box gap={2} sx={{ display: "flex" }}>
        <Box>
          <a target="_blank" href={socialMediaLink.facebook}>
            <img src={FacebookIcon} loading="lazy" />
          </a>
        </Box>
        <Box>
          <a target="_blank" href={socialMediaLink.linkedIn}>
            <img src={Linkedincon} loading="lazy" />
          </a>
        </Box>
        <Box>
          <a target="_blank" href={socialMediaLink.twitter}>
            <img src={TwitterIcon} loading="lazy" />
          </a>
        </Box>
      </Box>{" "}
    </Box>
  );
};

export default Footer;
