import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Dialog,Grid, DialogTitle,TableContainer, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useUpdatePartnerMutation } from "../../store";



function PartnerUpdateModal({ boolean, onOpen, partner }) {
  const [updatePartner, results] = useUpdatePartnerMutation();
  console.log(results);

  useEffect(() => {
    if (results.isSuccess) {
      alert(results.data.status);
      onOpen();
    } else if (results.isError) {
      alert(results.error.data.status);
    }
  }, [results, onOpen]);

  const [values, setValues] = useState({
    partnerId: partner.id,
    name: partner.name,
    point_of_contact_name: partner.point_of_contact_name,
    email: partner.email,
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
      alert("fill all fields");
      return;
    } else {
      updatePartner(values);
    }
  };
  const handleClose = () => {
    onOpen(false);
  };
  return (
    <div>
    <Dialog open={boolean} onClose={() => onOpen()}>

      <DialogContent>
      <Grid container mb={3}>
          <Grid item xs={11}>
            <Typography variant="h6" component="h2">
            Update Partner
            </Typography>
          </Grid>
          <Grid color="text.secondary" item xs={1}>
          <CloseIcon  onClick={handleClose}/>

          </Grid>
        </Grid>
       
        <TextField
        margin="dense"
        label="space name"
        name="name"
        value={values.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
    
      margin="dense"
      label="point of contact name"
      name="point_of_contact_name"
      value={values.point_of_contact_name}
      onChange={handleChange}
      fullWidth
    />
    <TextField
    margin="dense"
    label="point of contact email"
    name="email"
    value={values.email}
    onChange={handleChange}
    fullWidth
  />
            
            </DialogContent>
            <Box sx={{ pb: 2, px: 2 }}>
            <DialogActions>
              <Button fullWidth variant="contained"  onClick={handleSubmit}>
              Update Partner
              </Button>
            </DialogActions>
          </Box>
            </Dialog>
    </div>
  );
}

export default PartnerUpdateModal;


