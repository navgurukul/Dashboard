//26-05
import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import showToast from "../../showToast";
import { useUpdateGroupMutation } from "../../../store";
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

const EditGroupModal = ({ boolean, onToggle, group }) => {
  const { groupId } = useParams();
  const [updateGroup, results] = useUpdateGroupMutation();

  const [values, setValues] = useState({
    name: group["group_name"],
  });

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
    let updatedGroup = { groupId: group?.id };
    updatedGroup["group_name"] = "";
    if (values.name.trim()) {
      updatedGroup["group_name"] = values.name;
    }
    updateGroup(updatedGroup);
  };

  return (
    <div>
      <Dialog open={boolean} onClose={onToggle} fullWidth>
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
            value={values.name}
            onChange={handleChange}
            name="name"
            label="Group Name"
            margin="dense"
            fullWidth
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

export default EditGroupModal;
