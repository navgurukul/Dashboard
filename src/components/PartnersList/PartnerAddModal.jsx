import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPartner } from "../../store";
import {Dialog,Grid, DialogTitle,TableContainer, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

function PartnerAddModal(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [values, setValues] = useState({
    name: "",
    pocName: "",
    pocEmail: "",
    poclocation:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };
console.log(values);
  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.pocName.trim() ||
      !values.pocEmail.trim()||
      !values.location.trim()
    ) {
      return;
    } else {
      open();
      setValues({
        name: "",
        pocName: "",
        pocEmail: "",
        pocLocation:""
      });
      dispatch(addPartner({ token, object: values }));
      // addPartner(values);
    }
  };


  return (
    <>
    <Dialog open={props.open} onClose={props.handleClose} >

        <DialogContent>
        <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                New Partner
              </Typography>
            </Grid>
            <Grid color="text.secondary" item xs={1}>
              <CloseIcon onClick={props.handleClose} />
            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            label="partner name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
          />
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
            label="location (city)"
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

export default PartnerAddModal;

