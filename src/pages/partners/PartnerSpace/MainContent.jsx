import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import spaceShipImage from "./assets/student illustration.svg";
import { useState } from "react";

const MainContent = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
     
    //   <Main open={open}>
        <Box
          sx={{
            width: "max-content",
            margin: "0px auto",
            textAlign: "center",
            mt: 15,
          }}
        >
          <img src={spaceShipImage} alt="" />
          <Typography sx={{ fontSize: "14px", ml: 2 }}>
            Let's create the first batch to get started
          </Typography>

          <Button
            variant="contained"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, marginLeft: "16px", ...(open && { display: "none" }) }}
          >
            <Typography variant="subtitle2">New Spaces</Typography>
          </Button>
        </Box>
        
     
  );
};

export default MainContent;
