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
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <img src={spaceShipImage} alt="" />
        <Typography sx={{ fontSize: "14px", ml: 2 }}>
          Spaces help organize your student data in smaller chunks
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
