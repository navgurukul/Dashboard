import { useEffect, useState } from "react";
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
  FormControlLabel,
  Autocomplete,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import moment_tz from 'moment-timezone';

import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { breakpoints } from "../../../theme/constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddBatchMutation } from "../../../store";
import { useFetchVolunteersQuery } from "../../../store";
import showToast from "../../showToast";

const CreateBatchModal = ({ boolean, onToggle }) => {
  const istTimeZone = 'Asia/Kolkata';
  const { partnerId } = useParams();
  const {
    id: { spaceId, groupId },
  } = useSelector((state) => state.selectedCourse);
  const { course } = useSelector((state) => state.selectedCourse);
  const [addBatch, results] = useAddBatchMutation();

  useEffect(() => {
    if (results.isError) {
      showToast("error", "Failed to create a batch");
    } else if (results.isSuccess) {
      showToast("success", "Created a batch successfully");
      onToggle();
    }
  }, [results.isSuccess, results.isError]);

  const [classFields, setClassFields] = useState({
    group_id: groupId,
    space_id: spaceId,
    partner_id: [partnerId],
    volunteer_id: "",
    pathway_id: course.pathway_id,
    // facilitator_id: 7108,
    // exercise_id: 530,
    // course_id: 21,
    category_id: 3,
    description: "description",
    type: "batch",
    frequency: "DAILY",
    lang: "en",
    max_enrolment: "",
    title: "",
    facilitator_name: "",
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    on_days: [],
    schedule: {},
  });
  const [sameTime, setSameTime] = useState({});
  // console.log(sameTime);
  const [timeChecked, setTimeChecked] = useState(true);
  useEffect(() => {
    // console.log(classFields);
  }, [classFields]);

  const handleTimeCheckedChange = (event) => {
    setTimeChecked(!timeChecked);
  };

  // console.log(classFields.schedule);
  const { data } = useFetchVolunteersQuery();
  const volunteer = data?.map((item) => ({
    label: item.name,
    id: item.volunteer_id,
    pathway_id: item.pathway_id,
  }));

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [onInput, setOnInput] = useState({
    title: false,
    facilitator_name: false,
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

  const commonElements = Object.keys(days).filter((element) =>
    classFields.on_days.includes(element)
  );
  const filteredDayValues = commonElements.map((key) => days[key]);

  const addAll = (e) => {
    timeChecked && commonElements.map((dayKey)=>{
      return classFields.schedule[dayKey] = {...sameTime}
    })
    console.log(classFields);
  };

  console.log(classFields);

  const handleSubmit = () => {
    // timeChecked &&
    // let start_time =
    //   classFields.date +
    //   "T" +
    //   classFields.start_time.toLocaleTimeString("en-IN", {
    //     hour12: false,
    //     timeZone: "Asia/Kolkata",
    //   }) +
    //   "Z";
    // let end_time =
    //   classFields.date +
    //   "T" +
    //   classFields.end_time.toLocaleTimeString("en-IN", {
    //     hour12: false,
    //     timeZone: "Asia/Kolkata",
    //   }) +
    //   "Z";

    // const { date, ...rest } = classFields;

    addBatch({ ...rest, start_time, end_time });
  };

  const handleDaySelection = (e) => {
    const index = classFields.on_days.indexOf(e.target.value);
    if (index === -1) {
      setClassFields({
        ...classFields,
        ["on_days"]: [...classFields.on_days, e.target.value],
      });
    } else {
      const dayDeleted = classFields.on_days.filter(
        (selectedDay) => selectedDay !== e.target.value
      );
      setClassFields({ ...classFields, ["on_days"]: dayDeleted });
    }
  };

  return (
    <Box>
      <Modal open={boolean} onClose={onToggle} style={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Grid container mb={3}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                  Create {course.label} Batch
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
                  return { ...prev, title: true };
                });
              }}
              value={classFields.title}
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  title: e.target.value,
                });
              }}
              name="title"
              label="Batch Name"
            />

            {course.label == "Python" && (
              <Typography variant="body2" color="text.secondary">
                All 28 classes will be created automatically with titles and
                descriptions
              </Typography>
            )}
            <Autocomplete
              value={{
                label: classFields.facilitator_name || "",
                id: classFields.volunteer_id || "",
              }}
              sx={{ mb: 3 }}
              options={volunteer || []}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              onChange={(e, newVal) => {
                setClassFields((prev) => {
                  return {
                    ...prev,
                    volunteer_id: newVal?.id,
                    facilitator_name: newVal?.label,
                  };
                });
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-error-helper-text"
                  variant="outlined"
                  label="For Tutor"
                />
              )}
            />

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
                      value={item}
                      checked={classFields.on_days.includes(item)}
                      onChange={handleDaySelection}
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
            <TextField
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

            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  value={timeChecked}
                  checked={timeChecked}
                  onChange={handleTimeCheckedChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              // onClick={() => {
              //   setOnInput((prev) => {
              //     return { ...prev, days: true };
              //   });
              // }}
              label="Keep the class timings same for all days"
            />
            {/* Start and End time*/}
            <Button onClick={addAll}>click me</Button>
            {timeChecked ? (
              <Grid container spacing={2}>
                {[
                  { label: "Start Time", prop: "startTime" },
                  { label: "End Time", prop: "endTime" },
                ].map(({ label, prop }, index) => (
                  <Grid item xs={isActive ? 12 : 6} key={index}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      key={index}
                    >
                      <Stack spacing={3} key={index}>
                        <DesktopTimePicker
                          ampm={false}
                          key={index}
                          label={label}
                          value={sameTime.prop ? new Date(sameTime.prop) : null}
                          // value={sameTime[prop]}
                          onChange={(time) => {
                            setSameTime({
                              ...sameTime,
                              [prop]: moment_tz(time).tz(istTimeZone).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            });
                          }}
                          minTime={
                            classFields.date === moment().format("YYYY-MM-DD")
                              ? new Date(new Date().setSeconds(0))
                              : null
                          }
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                ))}
              </Grid>
            ) : (
              classFields.on_days.map((item, index) => (
                <>
                  <Typography variant="body2" color="text.secondary">
                    {filteredDayValues[index]} Time
                  </Typography>
                  {
                    <Grid container spacing={2}>
                      {[
                        { label: "Start Time", prop: "startTime" },
                        { label: "End Time", prop: "endTime" },
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
                                ampm={false}
                                value={
                                  classFields.schedule[item]
                                    ? new Date(classFields.schedule[item][prop])
                                    : null
                                }
                                minTime={new Date(new Date().setSeconds(0))}
                                onChange={(time) => {
                                  setClassFields({
                                    ...classFields,
                                    schedule: {
                                      ...classFields.schedule,
                                      [item]: {
                                        ...classFields.schedule[item],
                                        [prop]: moment_tz(time).tz(istTimeZone).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                                      },
                                    },
                                  });
                                }}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                      ))}
                    </Grid>
                  }
                </>
              ))
            )}

            <Typography variant="body2" color="text.secondary">
              Language
            </Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={classFields.lang}
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  lang: e.target.value,
                });
              }}
              row
              mb={3}
              // defaultValue="en"
            >
              <FormControlLabel
                value="en"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel value="hi" control={<Radio />} label="Hindi" />
              <FormControlLabel value="te" control={<Radio />} label="Telugu" />
              <FormControlLabel value="ta" control={<Radio />} label="Tamil" />
            </RadioGroup>
            <Typography variant="body2" color="text.secondary">
              Cap enrollments at
            </Typography>
            <RadioGroup
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  max_enrolment: e.target.value,
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
              disabled={results.isLoading}
              onClick={handleSubmit}
              variant="contained"
            >
              {results.isLoading ? "Creating..." : "Create a Batch"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateBatchModal;
