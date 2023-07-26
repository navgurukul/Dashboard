import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useUpdateSpaceMutation } from "../../../store";
import showToast from "../../showToast";
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
import useValidEmail from "../../../hooks/useValidEmail";

const UpdateSpaceModal = ({ boolean, onToggle, space }) => {
  const [updateSpace, results] = useUpdateSpaceMutation();

  const [values, setValues] = useState({
    name: space["space_name"],
    pocName: space["point_of_contact_name"] || "",
    pocEmail: space["email"] || "",
  });

  const { isValidEmail } = useValidEmail(values.pocEmail);

  useEffect(() => {
    if (results.isError) {
      showToast("error", results.error.data.status);
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
    let updatedSpace = { spaceId: space?.id };
    updatedSpace["space_name"] = "";
    if (values.name.trim()) {
      updatedSpace["space_name"] = values.name;
    }
    if (values.pocName.trim()) {
      updatedSpace["point_of_contact_name"] = values.pocName;
    }
    if (values.pocEmail.trim()) {
      updatedSpace["email"] = values.pocEmail;
    }
    console.log(updatedSpace);
    updateSpace(updatedSpace);
  };

  return (
    <div>
      <Dialog open={boolean} onClose={onToggle}>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Edit space
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
            value={values.name}
            onChange={handleChange}
            name="name"
            label="Space Name"
            margin="dense"
            fullWidth
          />
          <Typography variant="body2" color="#6D6D6D">
            Please fill the below fields if individual POC is required for this
            space apart from the Partner's main POC
          </Typography>
          <TextField
            name="pocName"
            label="Point of Contact Name (Optional)"
            value={values.pocName}
            onChange={handleChange}
            margin="dense"
            fullWidth
          />
          <TextField
            value={values.pocEmail}
            onChange={handleChange}
            name="pocEmail"
            label="Point of Contact Email(Optional)"
            margin="dense"
            fullWidth
          />
          {!isValidEmail && values.pocEmail.trim() && (
            <Typography sx={{ fontSize: "14px", color: "red" }}>
              Please enter a valid email
            </Typography>
          )}
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button
              disabled={!isValidEmail && values.pocEmail.trim().length > 0}
              variant="contained"
              onClick={handleSubmit}
            >
              Update Details
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default UpdateSpaceModal;
