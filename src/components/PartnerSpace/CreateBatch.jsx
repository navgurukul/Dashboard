import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import spaceShipImage from "./assets/student_illustration.svg";
import { useOutletContext, useParams } from "react-router-dom";

const CreateBatch = () => {
  const { handleCreateBatchToggle, createBatchOpen } = useOutletContext();

  return (
    <>
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
          Let's create the first batch to start listing students
        </Typography>

        <Button
          variant="contained"
          aria-label="open drawer"
          onClick={handleCreateBatchToggle}
          edge="start"
          // sx={{ mr: 2, marginLeft: "16px", ...(open && { display: "none" }) }}
          sx={{ mr: 2, marginLeft: "16px" }}
        >
          <Typography variant="subtitle2">Create Batch</Typography>
        </Button>
      </Box>
    </>
  );
};

export default CreateBatch;
