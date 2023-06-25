import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddGroupMutation } from "../../../store";
import showToast from "../../showToast";

const CreateGroupModal = ({ boolean, onToggle }) => {
  const { spaceId } = useParams();
  const [addGroup, results] = useAddGroupMutation();
  console.log(results);

  const [values, setValues] = useState({
    name: "",
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
    let group = { spaceId: spaceId };
    if (!values.name.trim()) return;
    if (values.name.trim()) {
      group["group_name"] = values.name;
    }
    addGroup(group);
  };

  return (
    <div>
      <Dialog open={boolean} onClose={onToggle}>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                New Student Group
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
          <Typography variant="body2" color="#6D6D6D">
            Students can be added to the group later by sharing invite link or
            through the dashboard single or in bulk
          </Typography>
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button onClick={handleSubmit} variant="contained">
              Create Student Group
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
