import React, { useState } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";

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

const CreateSpaceModal = ({ boolean, onToggle }) => {
  const [values, setValues] = useState({});

  return (
    <Box>
      <Modal
        open={boolean}
        onClose={onToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6">New Space</Typography>
            <TextField name="name" label="Space Name" />
            <Typography variant="body2" color="#6D6D6D">
              Please fill the below fields if individual POC is required for
              this space apart from the Partner’s main POC
            </Typography>
            <TextField
              name="pocName"
              label="Point of Contact Name (Optional)"
            />
            <TextField name="pocEmail" label="Point of Contact (Optional)" />
            <Button variant="contained">Create a space</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateSpaceModal;
