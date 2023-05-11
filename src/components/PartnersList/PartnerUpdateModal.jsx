import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePartner } from "../../store";
// import { useAddPartnerMutation } from "../../store/apis/partnersApi";
import CloseIcon from "@mui/icons-material/Close";

import {Dialog,Grid, DialogTitle,TableContainer, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  border: "none",
};

function PartnerUpdateModal({ boolean,onOpen, partner }) {
  // const [addPartner, results] = useAddPartnerMutation();
  // const [open, setOpen] = useState(false);

  console.log(partner);
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [values, setValues] = useState({
    id: partner.id,
    name: partner.name,
    pocName: partner.point_of_contact_name,
    pocEmail: partner.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.pocName.trim() ||
      !values.pocEmail.trim()
    ) {
      return;
    } else {
      onOpen();
      setValues({
        name: "",
        pocName: "",
        pocEmail: "",
      });
      dispatch(updatePartner({ token, object: values }));
    }
  };

  return (
     <>
    <Dialog open={onOpen} >

        <DialogContent>
        <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Edit Space
              </Typography>
            </Grid>
            <Grid color="text.secondary" item xs={1}>
            <CloseIcon  />

            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            label="space name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
          />
          <Typography>Please fill the below fields if individual POC is required for this space apart from the Partner’s main POC</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="point of contact name"
            name="pocName"
            value={values.contact}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="point of contact email"
            name="pocEmail"
            value={values.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="District"
            name="pocLocation"
            value={values.location}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
        <DialogActions>
          <Button fullWidth variant="contained"  onClick={handleSubmit}>
            Create Partner
          </Button>
        </DialogActions>
      </Box>
      </Dialog>
    </>
  );
}

export default PartnerUpdateModal;
