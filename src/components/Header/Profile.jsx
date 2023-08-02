import React, { useState,useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import EditProfileModal from "./EditProfileModal";
import studentProfilePhoto from "./asset/Ellipse 52.png";
import Header from "./Header";


const Profile = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const userLocalData=JSON.parse(localStorage.getItem('userData'))
  // console.log(userLocalData);
  
  return (
    <>
    <Header/>
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={studentProfilePhoto}
          alt="StudentProfile"
          style={{ height: "70px", width: "70px", marginBottom: "10px" }}
        />
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
        {userLocalData.name}
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
        {userLocalData.email}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={handleModalOpen}
        >
          Edit Profile
        </Typography>
      </Box>

      {/* Edit Profile Modal */}
      <EditProfileModal open={openModal} onClose={handleModalClose}  userLocalData={userLocalData}
 />
    </Box>
    </>
  );
};

export default Profile;
