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
import moment from "moment";
import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker
import { breakpoints } from "../../theme/constant";
const CreateBatchModal = ({ boolean, onToggle, saw }) => {
  // const [value, setValue] = React.useState(new Date());
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

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [onInput, setOnInput] = useState({
    title: false,
    poc_name: false,
  });
  // const changeHandler = (e) => {
  //   setClassFields({ ...classFields, [e.target.title]: e.target.value });
  // };
  // const handleLang = (e) => {
  //     setClassFields({ ...classFields, [e.target.lang]: e.target.value });
  //   };

  //   console.log(classFields.lang);
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

  // --------------------------------------------------------------------------

  // const handleSubmit = () => {
  //   const weekDday = Object.values(classFields.on_days);
  //   if (classFields.type === "batch") {
  //     let incrementedDate = new Date(classFields.date);
  //     let onDay = incrementedDate.toString().split(" ")[0];
  //     let flag = false;
  //     let firstDay = "";
  //     for (let i in days) {
  //       for (let k in days) {
  //         if (onDay === days[k]) {
  //           flag = true;
  //         }
  //         if (flag) {
  //           for (let j of weekDday) {
  //             if (days[j] === days[k]) {
  //               flag = false;
  //               firstDay = j;
  //               setMatchDay(false);
  //               break;
  //             } else {
  //               setMatchDay(true);
  //             }
  //           }
  //         }
  //       }
  //     }
  //     const index = weekDday.indexOf(firstDay);
  //     if (days[firstDay] !== onDay) {
  //       let newDate;
  //       var i = 1;
  //       while (i <= 7) {
  //         incrementedDate = moment(incrementedDate).add(1, "days")._d;
  //         let Day = incrementedDate.toString().split(" ")[0];
  //         if (days[weekDday[index]] === Day) {
  //           newDate = incrementedDate;
  //           break;
  //         }
  //         i = i + 1;
  //       }
  //       // Fields.date = moment.utc(newDate).format("YYYY-MM-DD");
  //       classFields.date = formatInUtc(newDate, "yyyy-MM-dd");
  //     } else {
  //       classFields.date = classFields.date;
  //     }
  //   } else {
  //     classFields.date = classFields.date;
  //   }

  //   //taking hours and minues from the time
  //   classFields.start_time = `${classFields.start_time.getHours()}:${classFields.start_time.getMinutes()}`;

  //   classFields.end_time = `${classFields.end_time.getHours()}:${classFields.end_time.getMinutes()}`;

  //   //combining time and date
  //   const classStartTime = moment(
  //     `${classFields.date} ${classFields.start_time}`
  //   );
  //   const classEndTime = moment(`${classFields.date} ${classFields.end_time}`);

  //   if (classStartTime.valueOf() >= classEndTime.valueOf()) {
  //   }

  //   //deleting partner_id when it's length is 0
  //   if (classFields.partner_id.length === 0) delete classFields.partner_id;

  //   //deleting date as we have combined with time and we don't want date separately
  //   delete classFields.date;
  //   // delete classFields[date];

  //   //adding combined date and time to start_time and end_time
  //   classFields.start_time = `${moment(classStartTime).format(
  //     "YYYY-MM-DDTHH:mm:ss"
  //   )}Z`;
  //   classFields.end_time = `${moment(classEndTime).format(
  //     "YYYY-MM-DDTHH:mm:ss"
  //   )}Z`;

  //   const commonFields = [
  //     "title",
  //     "description",
  //     "start_time",
  //     "end_time",
  //     "category_id",
  //     "pathway_id",
  //     "lang",
  //     "type",
  //     "volunteer_id",
  //   ];
  //   let payload;
  //   if (classFields.type === "doubt_class") {
  //     payload = _.pick(classFields, [
  //       ...commonFields,
  //       "course_id",
  //       "exercise_id",
  //     ]);
  //   } else if (classFields.type === "batch") {
  //     payload = _.pick(classFields, [
  //       ...commonFields,
  //       "partner_id",
  //       "frequency",
  //       "on_days",
  //     ]);
  //   }
  //   if (classFields.max_enrolment != "No Limit") {
  //     //add max_enrolment field only if it is not No Limit
  //     payload.max_enrolment = classFields.max_enrolment;
  //   }
  //   (!isEditMode ? createClass : editClass)(payload);
  // };

  //---------------------------------------------------------------------------
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
                        renderInput={(params) => <TextField {...params} />}
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
              row
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
