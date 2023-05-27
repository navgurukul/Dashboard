import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";

const CreateGroupModal = ({ boolean, onToggle }) => {
  const [radioValue, setRadioValue] = useState("one");
  const [students, setStudents] = useState([{}, {}]);

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <Box>
      <Dialog open={boolean} onClose={onToggle}>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Add Students
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radioValue}
                onChange={handleRadioChange}
              >
                <Box flex mt={3}>
                  <FormControlLabel
                    value="one"
                    control={<Radio />}
                    label="One at a time"
                  />
                  <FormControlLabel
                    value="bulk"
                    control={<Radio />}
                    label="Bulk Upload"
                  />
                </Box>
              </RadioGroup>
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
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "250px" },
            }}
          >
            <TextField
              margin="dense"
              fullWidth
              name="name"
              label="Student Name 1"
            />
            <TextField
              margin="dense"
              fullWidth
              name="name"
              label="Email 1"
              sx={{
                borderRadius: "10px",
              }}
            />
          </Box>
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button variant="contained">
              Add {students.length}
              {` Student${students.length > 1 ? "(s)" : ""}`}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CreateGroupModal;
