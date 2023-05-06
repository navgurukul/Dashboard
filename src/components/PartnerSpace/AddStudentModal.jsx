import React, { useState } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  border: "none",
};

const AddStudentModal = ({ boolean, onToggle }) => {
  const [values, setValues] = useState({});

  return (
    <Box>
      <Modal
        open={open}
        onClose={onToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6">Add Students</Typography>
            <Box sx={{ display: "flex" }}>
              <TextField name="name" label="Student Name 1" size="medium" />
              <TextField name="name" label="Email 1" />
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField name="name" label="Student Name 2" />
              <TextField name="name" label="Email 2" />
            </Box>
            <Typography variant="subtitle2" sx={{color:"success.main"}}><AddIcon/> Add Another Students</Typography>
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
