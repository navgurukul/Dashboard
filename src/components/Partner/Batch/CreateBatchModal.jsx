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
  FormHelperText,
  // error,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { breakpoints } from "../../../theme/constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddBatchMutation } from "../../../store";
import { useFetchVolunteersQuery } from "../../../store";
import showToast from "../../showToast";

const CreateBatchModal = ({ boolean, onToggle }) => {
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
    volunteer_id: 0,
    facilitator_id:0,
    pathway_id: course.pathway_id,
    category_id: 3,
    description: "description",
    type: "batch",
    frequency: "DAILY",
    lang: "en",
    max_enrolment: "10",
    title: "",
    facilitator_name: "",
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    on_days: [],
    schedule: {},
  });

  const [sameTime, setSameTime] = useState({}); // It is used to get same time for all the selected days.
  const [timeChecked, setTimeChecked] = useState(true); //it is used to get that voluntter/tutor is taking defferend time or same time for the class.
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showError, setShowError] = useState({
    title: false,
    partner: false,
    days: false,
    date: false,
    exercise: false,
  });
  const [helperText, setHelperText] = useState({
    title: "",
    partner: "",
    days: "",
    date: "",
  });
  const [onInput, setOnInput] = useState({
    title: false,
    partner: false,
    days: false,
    date: false,
  });

  //For title error field (batch and doubt class)
  useEffect(() => {
    if (onInput.title === true && classFields.title === "") {
      setShowError((prev) => {
        return { ...prev, title: true };
      });
      setHelperText((prev) => {
        if (classFields.type === "batch") {
          return { ...prev, title: "Please enter a batch name" };
        } else {
          return { ...prev, title: "This batch name is already taken" };
        }
      });
    } else {
      setShowError((prev) => {
        return { ...prev, title: false };
      });
      setHelperText((prev) => {
        return { ...prev, title: "" };
      });
    }
  }, [classFields.title]);

  //For partner error field

  useEffect(() => {
    if (
      onInput?.partner === true &&
      classFields?.facilitator_name === undefined
    ) {
      setShowError((prev) => {
        return { ...prev, partner: true };
      });
      setHelperText((prev) => {
        return { ...prev, partner: "Please choose a tutor for the batch" };
      });
    } else {
      setShowError((prev) => {
        return { ...prev, partner: false };
      });
      setHelperText((prev) => {
        return { ...prev, partner: "" };
      });
    }
  }, [classFields.facilitator_name]);

  //For disabled button
  useEffect(() => {
    if (
      classFields?.title?.length > 0 &&
      classFields?.facilitator_name?.length > 0 &&
      classFields?.on_days.length > 0 &&
      classFields?.date &&
      (Object.keys(sameTime).length > 1 ||
        Object.keys(classFields.schedule).length > 1)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    classFields?.title,
    classFields?.facilitator_name,
    classFields?.on_days,
    classFields.date,
    sameTime,
    classFields.schedule,
  ]);

  const modifiedString = classFields.date.replace(/-/g, "/");
  const d = new Date(modifiedString);
  const firstTwoCharacters = String(d).slice(0, 2);

  const isValuePresent = classFields.on_days.includes(
    firstTwoCharacters.toUpperCase()
  );

  useEffect(() => {
    // console.log(classFields);
  }, [classFields]);

  const { data } = useFetchVolunteersQuery();

  const volunteer = data?.map((item) => ({
    label: item.name,
    id: item.volunteer_id,
    pathway_id: item.pathway_id,
    optedPathways: item.pathways,
    facilitator_id : item.id,
  }));

  const handleTimeCheckedChange = (event) => {
    setTimeChecked(!timeChecked);
  };

  console.log(classFields);
  // this is used to update the date of the class
  const changeHandler = (e) => {
    setClassFields({ ...classFields, [e.target.name]: e.target.value });
  };

  const style = {
    position: "absolute",
    top: !isActive
      ? classFields.on_days?.length > 2 && !timeChecked
        ? "105%"
        : "90%"
      : "90%",
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
    MO: "Monday",
    TU: "Tuesday",
    WE: "Wednesday",
    TH: "Thusday",
    FR: "Friday",
    SA: "Saturday",
    SU: "Sunday",
  };

  //This is to get the day to make a key for the deffrent selected time.
  const commonElements = Object.keys(days).filter((element) =>
    classFields.on_days.includes(element)
  );
  const filteredDayValues = commonElements.map((key) => days[key]);

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

  const handleSubmit = () => {
    let payload = classFields;
    timeChecked &&
      commonElements.map((dayKey) => {
        return (payload.schedule[dayKey] = { ...sameTime });
      });
    const startend = payload.schedule[Object.keys(payload.schedule)[0]];
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(startend.startTime.split(":")[0]);
    startDate.setMinutes(startend.startTime.split(":")[1]);
    endDate.setHours(startend.endTime.split(":")[0]);
    endDate.setMinutes(startend.endTime.split(":")[1]);

    // -------------------
  const originalStartString =(moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"))
  const tStartIndex = originalStartString.toUpperCase().indexOf('T');
  const modifiedStartDateString = tStartIndex !== -1 ? `${classFields.date}T${originalStartString.substring(tStartIndex + 1)}` : originalStartString;

  const originalEndString =(moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"))
  const tEndIndex = originalEndString.toUpperCase().indexOf('T');
  const modifiedEndDateString = tEndIndex !== -1 ? `${classFields.date}T${originalEndString.substring(tEndIndex + 1)}` : originalEndString;

    // ----------------
      

    payload = {
      ...classFields,
      start_time: modifiedStartDateString,
      end_time: modifiedEndDateString,
    };

    delete payload.date;
    timeChecked && delete payload.schedule;

    isValuePresent ? addBatch(payload) : "batch not created";
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
              error={showError.title}
              helperText={helperText.title}
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
              options={volunteer || []}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              onChange={(e, newVal) => {
                setClassFields((prev) => {
                  console.log(newVal);
                  return {
                    ...prev,
                    facilitator_id:newVal?.facilitator_id,
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
                  onClick={() => {
                    setOnInput((prev) => {
                      return { ...prev, partner: true };
                    });
                  }}
                  error={showError.partner}
                  helperText={helperText.partner}
                />
              )}
            />

            <TextField
              helperText={
                !classFields.date
                  ? "Please choose a start date "
                  : classFields.on_days.length > 0 &&
                    !isValuePresent &&
                    "Please choose the valid date for the schaduled days"
                // "Please choose valid date for the selected days. please change the date or days"
              }
              error={
                !classFields.date ||
                (classFields.on_days.length > 0 && !isValuePresent)
              }
              type="date"
              variant="outlined"
              inputProps={{
                min: moment().format("YYYY-MM-DD"),
              }}
              value={classFields.date}
              name="date"
              // label="Start Date"
              fullWidth
              onChange={(e) => {
                changeHandler(e);
              }}
            />

            <FormLabel component="legend">
              <Typography variant="body2" color="text.secondary">
                Schedule on days
              </Typography>
            </FormLabel>
            <FormGroup aria-label="position" row>
              {Object.keys(days).map((item, index) => (
                <FormControlLabel
                  key={index}
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
                />
              ))}
            </FormGroup>
            {classFields.on_days?.length === 0 && onInput.days ? (
              <FormHelperText sx={{ color: "red" }} id="my-helper-text">
                Please select atleast one day
              </FormHelperText>
            ) : null}

            <Typography variant="body2" color="text.secondary">
              Class Timings
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  value={timeChecked}
                  checked={timeChecked}
                  onChange={handleTimeCheckedChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Keep the class timings same for all days"
            />

            {/* Start and End time*/}
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
                          minTime={new Date(new Date().setSeconds(0))}
                          onChange={(time) => {
                            setSameTime({
                              ...sameTime,
                              [prop]: time.toLocaleTimeString(),
                            });
                          }}
                          // minTime={
                          //   classFields.date === moment().format("YYYY-MM-DD")
                          //     ? new Date(new Date().setSeconds(0))
                          //     : null
                          // }
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
                                        [prop]: time.toLocaleTimeString(),
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
              value={classFields.max_enrolment}
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
              disabled={
                results.isLoading ||
                buttonDisabled ||
                (classFields.on_days.length > 0 && !isValuePresent)
              }
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
