import React, { useState } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; 
 

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 592,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  border: "none",
};

const TextFieldStyle = {
  margin: "10px",
}

const TypographyStyle = {
  fontSize:"22px",
  alignItem:"center"
}

const AddStudentModal = ({ onToggle }) => {
  const [values, setValues] = useState({});

  return (
    <Box>
      <Modal
        open={true}
        onClose={onToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6">Add Students</Typography>
            <Box sx={{ display: "flex" }}>
            <TextField name="name" label="Student Name 1" sx={TextFieldStyle} />
              <TextField name="name" label="Email 1" sx={TextFieldStyle}/>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField name="name" label="Student Name 2" sx={TextFieldStyle} />
              <TextField name="name" label="Email 2" sx={TextFieldStyle}/>
            </Box>
            <Typography variant="subtitle2" sx={{color:"success.main",display:"flex", TypographyStyle}}><AddIcon sx={{mr:1}}/> Add Another Students</Typography>
            <Button variant="contained" sx={{ bgcolor: "success.main",  "&:hover": { bgcolor: "success.main" }}}>
              Create a space
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddStudentModal;
