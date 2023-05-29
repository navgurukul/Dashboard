import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import spaceShipImage from "../assets/student_illustration.svg";
import { useOutletContext } from "react-router-dom";
import { Add } from "@mui/icons-material";

const AddStudents = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FAFAFA",
          pt: 3,
          width: "100%",
          // border:"1px solid red"
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={spaceShipImage} alt="" />
        <Typography
          sx={{ fontSize: "14px", ml: 2, width: "360px", textAlign: "center" }}
        >
          Students haven't arrived yet? They will login soon or add some
          students manually to make it lively
        </Typography>

        <Button
          variant="contained"
          aria-label="open drawer"
          edge="start"
          startIcon={<Add />}
          // sx={{ mr: 2, marginLeft: "16px", ...(open && { display: "none" }) }}
          sx={{
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="subtitle2">Add Student(s)</Typography>
        </Button>
      </Box>
    </>
  );
};

export default AddStudents;
