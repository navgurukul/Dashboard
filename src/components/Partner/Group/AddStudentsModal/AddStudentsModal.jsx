import { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, Grid, DialogContent, DialogActions } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddStudentsList from "./AddStudentsList";
import { useAddSingleStudentsMutation } from "../../../../store";
import BulkUpload from "./BulkUpload";

const AddStudentsModal = ({ boolean, onToggle }) => {
  const { groupId } = useParams();
  const [addSingleStudents, results] = useAddSingleStudentsMutation();
  const [students, setStudents] = useState([
    { name: "", email: "", id: crypto.randomUUID() },
  ]);
  const [radioValue, setRadioValue] = useState("one");

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleAddStudent = () => {
    const updatedStudents = [
      ...students,
      { name: "", email: "", id: crypto.randomUUID() },
    ];
    setStudents(updatedStudents);
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => {
      return student.id !== id;
    });
    setStudents(updatedStudents);
  };

  const handleEditStudent = (e, id) => {
    const { value, name } = e.target;

    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return { ...student, [name]: value };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const handleSubmit = () => {
    const array = students.map((student) => {
      return { name: student.name, email: student.email };
    });
    addSingleStudents({ students: array, groupId });
  };

  useEffect(() => {
    //
  }, []);

  return (
    <Box sx={{ maxWidth: "592px" }}>
      <Dialog fullWidth open={boolean} onClose={onToggle}>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Add Students
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
          <Box mb={1.5}>
            <RadioGroup value={radioValue} onChange={handleRadioChange}>
              <Stack direction="row">
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
              </Stack>
            </RadioGroup>
          </Box>
          {radioValue === "one" ? (
            <AddStudentsList
              students={students}
              onDelete={handleDeleteStudent}
              onChange={handleEditStudent}
            />
          ) : (
            <BulkUpload />
          )}
        </DialogContent>

        {radioValue === "one" && (
          <Box sx={{ pb: 2, px: 2 }}>
            <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                disabled={students.length === 5 ? true : false}
                onClick={handleAddStudent}
                startIcon={<Add />}
                sx={{ alignSelf: "flex-start", marginBottom: "20px" }}
              >
                Add Another Student
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ alignSelf: "flex-end" }}
              >{`Add ${students.length} Student${
                students.length > 1 ? "(s)" : ""
              }`}</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default AddStudentsModal;
