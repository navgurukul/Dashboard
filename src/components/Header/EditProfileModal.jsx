import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  IconButton,
  styled,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import studentProfilePhoto from "./asset/Ellipse 52.png";

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const EditProfileModal = ({ open, onClose }) => {
  const [nameValue, setNameValue] = useState("Anand NG"); // State to keep track of the name value

  const handleSaveProfile = () => {
    // Logic to save the changed name to the server
    console.log("Save Profile:", nameValue);
    onClose(); // Close the modal after saving the profile
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" style={{ flex: 1 }}>
            Edit Profile
          </Typography>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Image */}
          <img
            src={studentProfilePhoto}
            alt="StudentProfile"
            style={{ height: "100px", width: "100px", marginTop: "10px" }}
          />
        </div>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: 500, height: 250 }}
        >
          {/* Name */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />

          {/* Email Address */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            defaultValue="anandNg@navgurukul.com"
            sx={{ marginTop: 3 }}
            disabled
          />

          {/* Save Profile Button */}
          <Box mt={2} sx={{ position: "absolute", bottom: "16px", right: "16px" }}>
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
