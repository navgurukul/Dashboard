import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
  useMediaQuery,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Autocomplete,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { breakpoints } from "../../theme/constant";
const CreateBatchModal = ({ boolean, onToggle, saw }) => {
  const [classFields, setClassFields] = useState({
    lang: "",
    limit: "",
    // selected_course:"",
    title: "",
    poc_name: "",
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    start_time: new Date(new Date().setSeconds(0)),
    end_time: new Date(
      new Date().setTime(new Date().getTime() + 1 * 60 * 60 * 1000)
    ),
  });
  console.log(classFields.lang, classFields.limit);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [onInput, setOnInput] = useState({
    title: false,
    poc_name: false,
  });

  const changeHandler = (e) => {
    setClassFields({ ...classFields, [e.target.name]: e.target.value });
  };

  const style = {
    position: "absolute",
    top: !isActive ? "80%" : "90%",
    left: !isActive ? "50%" : "45%",
    // height:'920px',
    transform: "translate(-50%, -50%)",
    width: !isActive ? "579px" : "350px",
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
      <Modal open={boolean} onClose={onToggle} style={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Grid container mb={3}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                  Create {saw} Batch
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

            {/* <FormLabel component="legend">
              <Typography
                variant="body2"
                color="text.secondary"
                // sx={{ mt: isActive ? 3 : 4, mb: isActive && 2 }}
              >
                Schedule on days
              </Typography>
            </FormLabel> */}
            {/* <FormGroup aria-label="position" row>
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
                  // labelPlacement={item}
                />
              ))}
            </FormGroup> */}
            {/* {classFields.on_days?.length === 0 && onInput.days ? (
                  <FormHelperText sx={{ color: "red" }} id="my-helper-text">
                    Please select atleast one day
                  </FormHelperText>
                ) : null} */}
            <TextField
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
            />

            <Typography variant="body2" color="text.secondary">
              Class Timings
            </Typography>
            {/* <FormControlLabel
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
              label="Keep the class timings same for all days"
              // labelPlacement="rock"
            /> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs} row="true">
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
            </LocalizationProvider> */}

            <Grid container mt={2} spacing={2}>
              {[
                { label: "Start Time", prop: "start_time" },
                { label: "End Time", prop: "end_time" },
              ].map(({ label, prop }, index) => (
                <Grid item xs={isActive ? 12 : 6} key={index}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    key={index}
                  >
                    <Stack spacing={3} key={index}>
                      <DesktopTimePicker
                        key={index}
                        label={label}
                        value={classFields[prop]}
                        onChange={(time) => {
                          setClassFields({
                            ...classFields,
                            [prop]: time,
                          });
                        }}
                        minTime={
                          classFields.date === moment().format("YYYY-MM-DD")
                            ? new Date(new Date().setSeconds(0))
                            : null
                        }
                        // FIX THIS
                        renderInput={(params) => <TextField {...params} />}
                        // FIX THIS
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2" color="text.secondary">
              Language
            </Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={classFields.lang}
              // onChange={handleLang}
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  lang: e.target.value,
                });
              }}
              row
              mb={3}
            >
              <FormControlLabel
                value="english"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel
                value="hindi"
                control={<Radio />}
                label="Hindi"
              />
              <FormControlLabel
                value="telugu"
                control={<Radio />}
                label="Telugu"
              />
              <FormControlLabel
                value="tamil"
                control={<Radio />}
                label="Tamil"
              />
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
              row
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="No Limit"
              />
              <FormControlLabel value="10" control={<Radio />} label="10" />
              <FormControlLabel value="20" control={<Radio />} label="20" />
              <FormControlLabel value="30" control={<Radio />} label="30" />
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
