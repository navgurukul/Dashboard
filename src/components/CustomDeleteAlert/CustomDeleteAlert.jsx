import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import showToast from "../showToast";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import {
  Dialog,
  Grid,
  DialogTitle,
  TableContainer,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// import { useUpdateStudentsMutation } from "../../store";

const CustomDeleteAlert = ({ boolean, onToggle, deleteSpace }) => {
  const handleDeleteSpace = () => {
    deleteSpace();
  };

  return (
    <Dialog open={boolean} onClose={onToggle} fullWidth>
      <DialogTitle>Delete confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
        <DialogActions>
          <Button onClick={onToggle}>Cancel</Button>
          <Button onClick={handleDeleteSpace}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDeleteAlert;
