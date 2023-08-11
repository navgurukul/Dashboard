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

  const userLocalData=JSON.parse(localStorage.getItem('AUTH'))
  
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
          src={userLocalData.profile_picture||userLocalData?.user?.profile_picture}
          alt="StudentProfile"
          style={{ height: "120px", width: "120px", marginBottom: "10px",borderRadius:"60px" }}
        />
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
        {userLocalData.name||userLocalData?.user?.name}
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
        {userLocalData?.user?.email}
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