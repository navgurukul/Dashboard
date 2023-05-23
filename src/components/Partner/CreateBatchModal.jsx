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
  // helperText,
  //   MenuItem,
  //   Select,
  //   InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  const [classFields, setClassFields] = useState({
    lang:"",
    limit:"",
    selected_course:"",
    title:"",
    poc_name:"",
    date:""
  });
  
  console.log(classFields.date);
  
  // const handleChange = (event) => {
  //   setClassFields(event.target.value);
  // };
  const [onInput, setOnInput] = useState({
    title: false,
    poc_name: false,
  });
  // const changeHandler = (e) => {
  //   setClassFields({ ...classFields, [e.target.title]: e.target.value });
  // };

  const [value, setValue] = React.useState(new Date());
  const style = {
    position: "absolute",
    top: "80%",
    left: "50%",
    height:'980px',
    transform: "translate(-50%, -50%)",
    width: "579px",
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
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
              Create Batch
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
            <Typography
              variant="body2"
              color="text.secondary"
              pr={2}
              // mb={3}
            >
              Learning Track
            </Typography>
            <RadioGroup
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  selected_course: e.target.value,
                });
              }}
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
              onClick={() => {
                setOnInput((prev) => {
                  return { ...prev, title: true };
                });
              }}
              
              // name="title"
              value={classFields.title}
              // helperText={helperText.title}
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  title: e.target.value,
                });
              }}
              name="name"
              label="For Tutor"
            />

            <TextField
            onClick={() => {
              setOnInput((prev) => {
                return { ...prev, poc_name: true };
              });
            }}
            
            // name="title"
            value={classFields.poc_name}
            // helperText={helperText.title}
            onChange={(e) => {
              setClassFields({
                ...classFields,
                poc_name: e.target.value,
              });
            }}
              name="poc_name"
              label="Batch Name"
              // value={values.poc_name}
              // onChange={handleChange}
            />
            <Typography variant="body2" color="text.secondary">
              All 28 classes will be created automatically with titles and
              descriptions
            </Typography>
            {/* <TextField
              // sx={{ mb: 4 }}
              type="date"
              variant="outlined"
              inputProps={{
                min: moment().format("YYYY-MM-DD"),
              }}
              value={classFields.date}
              name="date"
              label="Start Date"
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={classFields.date}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
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
            value={classFields.lang}
            // onChange={handleChange}
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  lang: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  limit: e.target.value,
                });
              }}
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
              Create a Batch
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateBatchModal;
