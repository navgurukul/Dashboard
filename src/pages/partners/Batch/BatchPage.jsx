import React from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import spaceShipImage from "../../../components/PartnerSpace/assets/student_illustration.svg";
import { Link, Outlet } from "react-router-dom"; 

const BatchPage = () => {
  return (
    <Box style={{ width:"100%", padding:"1rem" }} >
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle2" style={{fontSize:"16px"}}>Batch 1</Typography>
          <Typography style={{fontSize:"14px", marginLeft:"15px", padding:"8px", borderRadius:"50px", backgroundColor:"grey"}}   >Yet to Start</Typography>
        </Box>
        <Box  >
          <Typography style={{ fontSize: "12px",   }} display="flex" alignItems="center">
            <CalendarMonthIcon /> 16 Oct to 20 Nov
          </Typography>
        </Box>
      </Box>
      <Box display="flex" margin="5px 0px">
     <Box  sx={{m:1}} >
            <Link to={`students`} style={{textUnderlineOffset:"15px", fontSize: "12px", color:"black" }}>
              <Typography sx={{mr:3, fontSize:"16px" }} >Students</Typography>
            </Link>
        </Box>
        <Box sx={{m:1}} >
            <Link to={`attandance`} style={{textUnderlineOffset:"15px", fontSize: "12px", color:"black"}}>
              <Typography>Attendance Data</Typography>
            </Link>
        </Box>
     </Box>
      <Box display="flex" sx={{mt:2}} > 
        <TextField
          placeholder="Student Name, Class..."
          sx={{ flex: 1,}}
          size="small"
        />
        <Button variant="contained" sx={{ marginLeft: "16px" }}>
          <Typography variant="subtitle2"> + Add Student(s)</Typography>
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <img src={spaceShipImage} alt="spaceshipimage" />
        <Typography style={{ fontSize: "12px" }}>
          Students havent arrived yet to the batch? Add some students to make it
          lively
        </Typography>
      </Box>
      <Outlet/>
    </Box>
  );
};

export default BatchPage;
