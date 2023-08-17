import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useAddPartnerMutation } from "../../store";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  Grid,
  // DialogTitle,  
  // TableContainer,
  DialogContent,
  // DialogContentText,
  DialogActions,
} from "@mui/material";
import showToast from "../showToast";
import useValidEmail from "../../hooks/useValidEmail";

function PartnerAddModal({ boolean, onOpen }) {
  const [addPartner, results] = useAddPartnerMutation();

  const [values, setValues] = useState({
    name: "",
    point_of_contact_name: "",
    email: "",
  });

  const { isValidEmail } = useValidEmail(values.email);

  useEffect(() => {
    if (results.isSuccess) {
      showToast("success", results.data.status);
      onOpen();
    } else if (results.isError) {
      showToast("error", results.error.data.message);
    }
  }, [results.isSuccess, results.isError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.point_of_contact_name.trim() ||
      !values.email.trim()
    ) {
      // alert("Fill all fields");
      showToast("error", "Fill all fields");
      return;
    } else {
      addPartner(values);
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Dialog open={boolean} onClose={onOpen}>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                New Partner
              </Typography>
            </Grid>
            <Grid color="text.secondary" item xs={1}>
              <CloseIcon
                onClick={onOpen}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Grid>

          <TextField
            margin="dense"
            label="Partner Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Point of Contact Name"
            name="point_of_contact_name"
            value={values.point_of_contact_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Point of Contact Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
          />
          {values.email === "" ? "" : !isValidEmail && (
            <Typography sx={{ fontSize: "14px", color: "red" }}>
              Please enter a valid email
            </Typography>
          )}
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button
              disabled={!isValidEmail || values.email.trim() === ""}
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Create Partner
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default PartnerAddModal;
