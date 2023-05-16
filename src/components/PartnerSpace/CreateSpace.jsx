import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import spaceShipImage from "./assets/student_illustration.svg";
import { useOutletContext } from "react-router-dom";

const CreateSpace = () => {
  const { handleCreateSpaceToggle, createSpaceOpen } = useOutletContext();

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
          width: "100%",
          // border:"1px solid red"
        }}
      >
        <img src={spaceShipImage} alt="" />
        <Typography sx={{ fontSize: "14px", ml: 2 }}>
          Let's create the first space to get started
        </Typography>

        <Button
          variant="contained"
          aria-label="open drawer"
          onClick={handleCreateSpaceToggle}
          edge="start"
          // sx={{ mr: 2, marginLeft: "16px", ...(open && { display: "none" }) }}
          sx={{ m: 1 }}
        >
          <Typography variant="subtitle2">New Spaces</Typography>
        </Button>
      </Box>
    </>
  );
};

export default CreateSpace;
