import React, { useState ,useEffect} from "react";
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
// import studentProfilePhoto from "./asset/unnamed.png";
import axios from "axios"

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const EditProfileModal = ({ open, onClose,userLocalData  }) => {
  const [nameValue, setNameValue] = useState(""); 
  const [emailValue, setEmailValue] = useState("");
  const handleSaveProfile = () => {
    console.log("Save Profile:", nameValue,emailValue);
  
    const payload = {
      name: nameValue,
    };
  console.log(userLocalData);
    axios({
      method:'PUT',
      url: `https://merd-api.merakilearn.org/users/me`,
      headers: {
        accept: 'application/json',
        Authorization: userLocalData.idToken, 
      },
      data: payload,
    })
      .then((res) => {
        const updatedUserLocalData = {
          ...userLocalData,
          name: nameValue,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserLocalData));

        onClose(); 
      })
      .catch((error) => {
        console.error('Error saving profile:', error);
      });
  };


  useEffect(() => {
    // Set initial values when the modal is opened
    if (userLocalData) {
      setNameValue(userLocalData.name);
      setEmailValue(userLocalData.email);
    }
  }, [userLocalData]);

  

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
            src={userLocalData.imageUrl}
            alt="StudentProfile"
            style={{ height: "120px", width: "120px", marginTop: "10px",borderRadius:"60px" }}
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
            sx={{ marginTop: 3 }}
            value={emailValue}
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
