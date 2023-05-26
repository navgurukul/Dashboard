import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { useAddSpaceMutation } from "../../store";
import { useParams } from "react-router-dom";
import showToast from "../showToast";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  Grid,
  DialogTitle,
  TableContainer,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const EditStudentGroupModal = ({ boolean, onToggle }) => {
  const { partnerId } = useParams();
  const [addSpace, results] = useAddSpaceMutation();
  console.log(results);
  const [values, setValues] = useState({
    name: "",
    pocName: "",
    pocEmail: "",
  });

  useEffect(() => {
    if (results.isError) {
      showToast("error", results.error.data.Error);
    } else if (results.isSuccess) {
      showToast("success", results.data.status);
      onToggle();
    }
  }, [results.isSuccess, results.isError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    let space = { partnerId: partnerId };
    space["space_name"] = "";
    if (values.name.trim()) {
      space["space_name"] = values.name;
    }
    if (values.pocName.trim()) {
      space["point_of_contact_name"] = values.pocName;
    }
    if (values.pocEmail.trim()) {
      space["email"] = values.pocEmail;
    }
    addSpace(space);
  };

  return (
    <div>
      <Dialog fullWidth >
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Edit Student Group
              </Typography>
            </Grid>
            <Grid color="text.secondary" item xs={1}>
              <CloseIcon
                onClick={onToggle}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            fullWidth
            value={values.name}
            onChange={handleChange}
            name="name"
            label="Group Name"
          />
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>
              Update Details
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};
 


export default EditStudentGroupModal;

