import React, { useEffect, useState } from "react";

import {
  Typography,
  Grid,
  Button,
  Box,
  Stack,
  Modal,
  TextField,
  Radio,
  RadioGroup,
  //   Autocomplete,
  Checkbox,
  FormGroup,
  //   Radio,
  //   RadioGroup,
  //   TextField,
  FormControl,
  FormControlLabel,
  Autocomplete,
  FormLabel,
  //   MenuItem,
  //   Select,
  //   InputLabel,
} from "@mui/material";

import dayjs from "dayjs";
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker

const CreateBatchModal = ({ boolean, onToggle }) => {
  // const { partnerId } = useParams();
  // const [addSpace, results] = useAddSpaceMutation();
  // console.log(results);
  const [value, setValue] = React.useState(new Date());
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // height:'35%',
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    border: "none",
  };

  const days = {
    MO: "Mon",
    TU: "Tue",
    WE: "Wed",
    TH: "Thu",
    FR: "Fri",
    SA: "Sat",
    SU: "Sun",
  };
  return (
    <Box>
      <Modal
        open={boolean}
        onClose={onToggle}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        // my = {2}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6">Create Batch</Typography>
            {/* <Typography variant="body2">Learning Track</Typography> */}
            <Typography
              variant="body2"
              color="text.secondary"
              pr={2}
              // mt={1}
              // mb={3}
            >
              Learning Track
            </Typography>
            <RadioGroup
              // onChange={(e) => {
              //   setClassFields({
              //     ...classFields,
              //     pathway_id: e.target.value,
              //   });
              // }}
              row="true"
              mb={3}
            >
              <FormControlLabel value="1" control={<Radio />} label="Python" />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Spoken English"
              />
            </RadioGroup>
            <TextField
              // value={values.name}
              // onChange={handleChange}
              name="name"
              label="Space Name"
            />

            <TextField
              name="pocName"
              label="Point of Contact Name (Optional)"
              // value={values.pocName}
              // onChange={handleChange}
            />
            <Typography variant="body2" color="text.secondary">
              All 28 classes will be created automatically with titles and
              descriptions
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  // value={value}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            {/* <Typography variant="body2" color="text.secondary">Schedule on days</Typography> */}
            <FormLabel component="legend">
              <Typography
                variant="body2"
                color="text.secondary"
                // sx={{ mt: isActive ? 3 : 4, mb: isActive && 2 }}
              >
                Schedule on days
              </Typography>
            </FormLabel>
            <FormGroup aria-label="position" row>
              {Object.keys(days).map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                    // value={item}
                    // checked={classFields.on_days.includes(item)}
                    // onChange={handleDaySelection}
                    />
                  }
                  onClick={() => {
                    setOnInput((prev) => {
                      return { ...prev, days: true };
                    });
                  }}
                  label={item}
                  labelPlacement={item}
                />
              ))}
            </FormGroup>
            {/* {classFields.on_days?.length === 0 && onInput.days ? (
                  <FormHelperText sx={{ color: "red" }} id="my-helper-text">
                    Please select atleast one day
                  </FormHelperText>
                ) : null} */}
            <Typography variant="body2" color="text.secondary">
              Class Timings
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} row="true">
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TimePicker
                    label="Start Time"
                    // value={value}
                    // onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TimePicker
                    label="End Time"
                    // value={value}
                    // onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <Typography variant="body2" color="text.secondary">
              Language
            </Typography>
            <RadioGroup
              // onChange={(e) => {
              //   setClassFields({
              //     ...classFields,
              //     pathway_id: e.target.value,
              //   });
              // }}
              row="true"
              mb={3}
            >
              <FormControlLabel value="1" control={<Radio />} label="English" />
              <FormControlLabel value="2" control={<Radio />} label="Hindi" />
              <FormControlLabel value="3" control={<Radio />} label="Telugu" />
              <FormControlLabel value="4" control={<Radio />} label="Tamil" />
            </RadioGroup>
            <Typography variant="body2" color="text.secondary">
              Cap enrollments at
            </Typography>
            <RadioGroup
              // onChange={(e) => {
              //   setClassFields({
              //     ...classFields,
              //     pathway_id: e.target.value,
              //   });
              // }}
              mb={3}
              row="true"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="No Limit"
              />
              <FormControlLabel value="2" control={<Radio />} label="10" />
              <FormControlLabel value="3" control={<Radio />} label="20" />
              <FormControlLabel value="4" control={<Radio />} label="30" />
            </RadioGroup>
            <Button
              // onClick={handleSubmit}
              variant="contained"
            >
              Create a space
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateBatchModal;
