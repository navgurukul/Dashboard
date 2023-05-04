import React from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Typography } from "@mui/material"; 

const BatchPage = () => {
  return (
    <Box sx={{ mt: 2, p: 3 }}> 
    <Box sx={{m:2}} display="flex" justifyContent="space-between" >
      <Box display="flex">
      <Typography variant="subtitle2">Batch 1</Typography>
      <Typography variant="subtitle2">Yet to Start</Typography>
      </Box>
      <Box display="flex">
      <Typography variant="subtitle2">Calender</Typography>
      <Typography variant="subtitle2">Student Name</Typography>
      </Box>
    </Box>
    <Box display="flex" >
      <TextField
        placeholder="Student Name, Class..."
        size="small"
        sx={{ flex: 1,}}
      />
      <Button variant="contained" sx={{ marginLeft: "16px" }}>
        <Typography variant="subtitle2"> + Add Student(s)</Typography>
      </Button>
    </Box>
    </Box>
  );
};

export default BatchPage;
