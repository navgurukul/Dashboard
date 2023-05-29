import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
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
import { useUpdatePartnerMutation } from "../../store";
import showToast from "../showToast";

function PartnerUpdateModal({ boolean, onOpen, partner }) {
  const [updatePartner, results] = useUpdatePartnerMutation();
  console.log(results);

  useEffect(() => {
    if (results.isSuccess) {
      showToast("success", results.data.status);
      onOpen();
    } else if (results.isError) {
      showToast("error", results.error.data.status);
    }
  }, [results.isSuccess, results.isError]);

  // const [values, setValues] = useState({
  //   partnerId: partner.id,
  //   name: partner.name,
  //   point_of_contact_name: partner.point_of_contact_name,
  //   email: partner.email,
  // });

  const [values, setValues] = useState({
    partnerId: partner.id,
    name: partner.name || "",
    point_of_contact_name: partner.point_of_contact_name || "",
    email: partner.email || "",
  });

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
      showToast("error", "Fill all fields");
      return;
    } else {
      updatePartner(values);
    }
  };

  return (
    <div>
      <Dialog open={boolean} onClose={onOpen}>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Update Partner
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
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Update Partner
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default PartnerUpdateModal;
