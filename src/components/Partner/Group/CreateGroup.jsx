import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import spaceShipImage from "../assets/student_illustration.svg";
import { useOutletContext } from "react-router-dom";
import { Add } from "@mui/icons-material";

const CreateGroup = () => {
  const { handleCreateGroupToggle, createGroupOpen } = useOutletContext();

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#FAFAFA",
          pt: 10,
          width: "100%",
          border:"4px solid yellow",
          height:" calc( 100vh - 80px)"
        }}
      >
        <img src={spaceShipImage} alt="" />
        <Typography sx={{ fontSize: "14px", ml: 2 }}>
          Get started by adding group and student details
        </Typography>

        <Button
          variant="contained"
          aria-label="open drawer"
          onClick={handleCreateGroupToggle}
          edge="start"
          startIcon={<Add />}
          // sx={{ mr: 2, marginLeft: "16px", ...(open && { display: "none" }) }}
          sx={{
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="subtitle2">Add Student Group</Typography>
        </Button>
      </Box>
    </>
  );
};

export default CreateGroup;
