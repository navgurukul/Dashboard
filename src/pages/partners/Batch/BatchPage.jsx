import React from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import spaceShipImage from "../../../components/PartnerSpace/assets/student illustration.svg"

const BatchPage = () => {
  return (
    <Box sx={{ mt: 4, p: 3, flex: 1 }}>
      <Box sx={{ m: 2.5 }} display="flex" justifyContent="space-between">
        <Box display="flex">
          <Typography variant="subtitle2">Batch 1</Typography>
          <Typography variant="subtitle2">Yet to Start</Typography>
        </Box>
        <Box display="flex">
          <Typography style={{fontSize:"12px", textAlign:"middle" }}><CalendarMonthIcon/> 16 Oct to 20 Nov</Typography>
          {/* <Typography variant="subtitle2" >Student Name</Typography> */}
        </Box>
      </Box>
      <Box display="flex">
        <TextField
          placeholder="Student Name, Class..."
          size="small"
          sx={{ flex: 1 }}
        />
        <Button variant="contained" sx={{ marginLeft: "16px" }}>
          <Typography variant="subtitle2"> + Add Student(s)</Typography>
        </Button>
      </Box>
      <Box sx={{ textAlign:"center", mt:5 }}>
          <img src={spaceShipImage} alt="spaceshipimage" />
          <Typography style={{fontSize:"12px"}} >Students havent arrived yet to the batch? Add some students to make it lively</Typography>
        </Box>
    </Box>
  );
};

export default BatchPage;
