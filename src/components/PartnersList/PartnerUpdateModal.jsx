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
    District:partner.District
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
      !values.email.trim()||
      !values.District.trim()
    ) {
      alert("fill all fields");
      return;
    } else {
      updatePartner(values);
    }
  };

  return (
    <>
      
      <Dialog open={boolean} onClose={() => onOpen()}>

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
                  name="point of contact name"
                  value={values.point_of_contact_name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                autoFocus
                margin="dense"
                label="point of contact (Optional)"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                label="District"
                name="District"
                value={values.District}
                onChange={handleChange}
                fullWidth
              />
            
         </DialogContent>
         <Box sx={{ pb: 2, px: 2 }}>
        <DialogActions>
          <Button fullWidth variant="contained"  onClick={handleSubmit}>
            updateData Space Details
          </Button>
        </DialogActions>
      </Box>
         </Dialog>
    </>
  );
}

export default PartnerUpdateModal;
