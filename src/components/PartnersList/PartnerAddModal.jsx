import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useAddPartnerMutation } from "../../store";
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

function PartnerAddModal({ boolean, onOpen }) {
  const [addPartner, results] = useAddPartnerMutation();
  console.log(results);
  const [values, setValues] = useState({
    name: "",
    point_of_contact_name: "",
    email: "",
  });

  useEffect(() => {
    if (results.isSuccess) {
      alert(results.data.status);
      onOpen();
    } else if (results.isError) {
      alert(results.error.data.Error);
    }
  }, [results, onOpen]);

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
      alert("Fill all fields");
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
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Create Partner
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default PartnerAddModal;
