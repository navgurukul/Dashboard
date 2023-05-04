

import React from 'react'
import { Button,Modal, TextField,Typography } from "@mui/material";
import {Box} from '@mui/material';
 

const CreateSpaceModal = () => {
    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }; 
  return (
    <Box>
       <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h6">New Space</Typography>
            <TextField
              // onChange={handleChange}
              // value={values.name}
              name="name"
              label="Space Name"
            />
            <Typography variant="body2" color="#6D6D6D">Please fill the below fields if individual POC is 
            required for this space apart from the Partner’s main POC
            </Typography>
            <TextField
              // onChange={handleChange}
              // value={values.pocName}
              name="pocName"
              label="Point of Contact Name (Optional)"
            />
            <TextField
              // onChange={handleChange}
              // value={values.pocEmail}
              name="pocEmail"
              label="Point of Contact (Optional)"
            />
            <Button variant="contained" 
            // onClick={handleSubmit}
            >
              Create a space
            </Button>
            </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default CreateSpaceModal
