import React, { useState ,useEffect,useRef} from "react";
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

  const [profileImage, setProfileImage] = useState(userLocalData.profile_picture)
  const inputRef=useRef(null)
  const handleImageClick=()=>{
    inputRef.current.click()
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // After the reader has successfully loaded the image, set it in the state

        const payload = new FormData();
        payload.append("image", file);
        axios({
          method: "POST",
          url: "https://api.merakilearn.org/courseEditor/ImageUploadS3",
          headers: {
            accept:
                  "application/json, text/plain, */*",
                "accept-language":
                  "en-GB,en-US;q=0.9,en;q=0.8",
          },
          data: payload,
        })
          .then((res) => {
            setProfileImage(res.data.file.url);
        })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    console.log("Save Profile:", nameValue,emailValue,profileImage);
  
    const payload = {
      name: nameValue,
      profile_picture: profileImage, 
    };
    axios({
      method:'PUT',
      url: `https://merd-api.merakilearn.org/users/${userLocalData.user.id}`,
      headers: {
        accept: 'application/json',
        Authorization: userLocalData.token, 
      },
      data: payload,
    })
      .then((res) => {
  
        const updatedUserLocalData = {
          ...userLocalData,
          name: nameValue,
          profile_picture: profileImage,
        };
        console.log("updatedUserLocalData:", updatedUserLocalData);

        localStorage.setItem("AUTH", JSON.stringify(updatedUserLocalData));

        onClose(); 
      })
      .catch((error) => {
        console.error('Error saving profile:', error);
      });
  };


  useEffect(() => {
    // Set initial values when the modal is opened
    if (userLocalData) {
      setNameValue(userLocalData.name||userLocalData?.user?.name);
      setEmailValue(userLocalData?.user?.email);
      setProfileImage(userLocalData?.user?.profile_picture)
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
            src={userLocalData.profile_picture||userLocalData?.user?.profile_picture}
            alt="StudentProfile"
            style={{ height: "120px", width: "120px", marginTop: "10px",borderRadius:"60px",position:"fixed" }}
          />
          <Button style={{marginTop: "135px"}}  onClick={handleImageClick}>Upload profile</Button>
          <input type="file" ref={inputRef} style={{display:"none"}} onChange={handleImageChange}></input>

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
            // label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 3 }}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
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
