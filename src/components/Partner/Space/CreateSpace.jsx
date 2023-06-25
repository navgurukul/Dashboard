import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import spaceShipImage from "../assets/student_illustration.svg";
import { useOutletContext } from "react-router-dom";
import { Add } from "@mui/icons-material";

const CreateSpace = () => {
  const { handleCreateSpaceToggle, createSpaceOpen } = useOutletContext();

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#FAFAFA",
          pt: 10,
          width: "100%",
          // border:"1px solid red"
        }}
      >
        <img src={spaceShipImage} alt="" />
        <Typography sx={{ fontSize: "14px", ml: 2 }}>
        Each partner can have multiple spaces. In each space, you can have multiple groups so that you can add relevant students to relevant groups. For Example - There can be a space for Python which will have a morning group, afternoon group & evening group. Each group will have students relevant to the time they can attend the classes.
        </Typography>

        <Button
          variant="contained"
          aria-label="open drawer"
          onClick={handleCreateSpaceToggle}
          edge="start"
          startIcon={<Add />}
          // sx={{ mr: 2, marginLeft: "16px", ...(open && { display: "none" }) }}
          sx={{
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="subtitle2">New Space</Typography>
        </Button>
      </Box>
    </>
  );
};

export default CreateSpace;
