import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { breakpoints } from "../../theme/constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateBatchModal = ({ boolean, onToggle }) => {
  const { partnerId, spaceId, groupId } = useParams();

  const { courseName } = useSelector((state) => state.selectedCourse);

  const [classFields, setClassFields] = useState({
    group_id: groupId,
    space_id: spaceId,
    partner_id: [partnerId],
    volunteer_id: "",
    pathway_id: 0,
    // facilitator_id: 7108,
    // exercise_id: 530,
    // course_id: 21,
    description: "description",
    category_id: 3,
    type: "batch",
    frequency: "DAILY",
    lang: "",
    max_enrolment: "",
    title: "",
    facilitator_name: "",
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    start_time: new Date(new Date().setSeconds(0)),
    end_time: new Date(
      new Date().setTime(new Date().getTime() + 1 * 60 * 60 * 1000)
    ),
    // on_days: [],
  });

  const [partnerPathwayId, setPartnerPathwayId] = useState();
  const [volunteer, setVolunteer] = useState([]);
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

  const PathwayList = [
    { id: 1, name: "Python" },
    { id: 2, name: "Spoken English" },
    { id: 3, name: "Typing" }
  ];

  PathwayList.map((course) => {
    if (course.name === courseName){
      classFields.pathway_id = course.id;
    }
  })
  // const days = {
  //   MO: "Mon",
  //   TU: "Tue",
  //   WE: "Wed",
  //   TH: "Thu",
  //   FR: "Fri",
  //   SA: "Sat",
  //   SU: "Sun",
  // };

  // useEffect(() => {
  //   setClassFields((prev) => {
  //     return { ...prev, pathway_id: partnerPathwayId?.[0] };
  //   });
  // }, [partnerPathwayId]);

  useEffect(() => {
    axios({
      url: "https://merd-api.merakilearn.org/volunteers",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5Nzg4IiwiZW1haWwiOiJkYXlhQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjgxOTcwNDQzLCJleHAiOjE3MTM1MjgwNDN9.JBQD1zcEwpWHi743fxh-dQpVJ5vODAZvwTjihZZdm7A",
        "version-code": 50,
      },
    }).then((res) => {
      const volunteers = res?.data?.map((item, index) => {
        return {
          label: item.name,
          id: item.volunteer_id,
          pathway_id: item.pathway_id,
        };
      });
      setVolunteer(volunteers);
      // console.log(volunteers);
    });
  }, []);

  // console.log(classFields);
  // console.log(volunteer);
  const handleSubmit = () => {
    const start_time =
      classFields.date +
      "T" +
      classFields.start_time.toLocaleTimeString() +
      "Z";
    const end_time =
      classFields.date + "T" + classFields.end_time.toLocaleTimeString() + "Z";

    const FinalData = { ...classFields };
    delete FinalData.date;

    return axios({
      url: "https://merd-api.merakilearn.org/classes",
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2Nzg3ODA4MDIsImV4cCI6MTcxMDMzODQwMn0.PYkl5H4bE10CtE_VUKU11q8MquHGs3xSdmAbTEctwUA",
        "version-code": 50,
      },
      data: {
        ...FinalData,
        start_time,
        end_time,
      },
    })
      .then((res) => {
        // console.log(res);
        onToggle = true;
        // e.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleDaySelection = (e) => {
  //   const index = classFields.on_days.indexOf(e.target.value);
  //   if (index === -1) {
  //     setClassFields({
  //       ...classFields,
  //       ["on_days"]: [...classFields.on_days, e.target.value],
  //     });
  //   } else {
  //     const dayDeleted = classFields.on_days.filter(
  //       (selectedDay) => selectedDay !== e.target.value
  //     );
  //     setClassFields({ ...classFields, ["on_days"]: dayDeleted });
  //   }
  // };

  return (
    <Box>
      <Modal open={boolean} onClose={onToggle} style={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Grid container mb={3}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                  Create {courseName} Batch
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

            <Typography variant="body2" color="text.secondary">
              All 28 classes will be created automatically with titles and
              descriptions
            </Typography>

            {/* <TextField
              onClick={() => {
                setOnInput((prev) => {
                  return { ...prev, facilitator_name: true };
                });
              }}
              value={classFields.facilitator_name}
              onChange={(e) => {
                setClassFields({
                  ...classFields,
                  facilitator_name: e.target.value,
                });
              }}
              name="name"
              label="For Tutor"
            /> */}

            <Autocomplete
              value={{
                label: classFields.facilitator_name || "",
                id: classFields.volunteer_id || "",
              }}
              // name="partner_id"

              sx={{ mb: 3 }}
              options={volunteer}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              onChange={(e, newVal) => {
                // setPartnerPathwayId(newVal?.pathway_id);
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
                  onClick={() => {
                    // setOnInput((prev) => {
                    //   return { ...prev, partner: true };
                    // });
                  }}
                  variant="outlined"
                  label="For Tutor"
                />
              )}
            />

            {/* <FormLabel component="legend">
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
            </FormGroup> */}
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
            /> */}

            <Grid container spacing={2}>
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
            <Button onClick={handleSubmit} variant="contained">
              Create a Batch
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateBatchModal;
