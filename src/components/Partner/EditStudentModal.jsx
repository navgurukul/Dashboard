import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { useAddSpaceMutation } from "../../store";
import { useParams } from "react-router-dom";
import showToast from "../showToast";
import CloseIcon from "@mui/icons-material/Close";
import {Container} from "@mui/material";
import {
  Dialog,
  Grid,
  DialogTitle,
  TableContainer,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useUpdateStudentsMutation } from "../../store";

const EditStudentModal = ({boolean, onToggle, student}) => {
  const { studentId } = useParams();
  const [updateStudent, results] = useUpdateStudentsMutation();
  console.log(results);
  // const [values, setValues] = useState({
  //   name: student["student_name"],
  //   // email: student["student_name"],
  // });

  // useEffect(() => {
  //   if (results.isError) {
  //     showToast("error", results.error.data.Error);
  //   } else if (results.isSuccess) {
  //     showToast("success", results.data.status);
  //     onToggle();
  //   }
  // }, [results.isSuccess, results.isError]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedValues = { ...values, [name]: value };
  //   setValues(updatedValues);
  // };

  // const handleSubmit = () => {
  //   let updateStudent = { studentId: studentId };
  //   updateStudent["student_name"] = "";
  //   if (values.name.trim()) {
  //     space["student_name"] = values.name;
  //   }
  //   if (values.email.trim()) {
  //     space["email"] = values.pocName;
  //   }
  // //   // if (values.pocEmail.trim()) {
  // //   //   space["email"] = values.pocEmail;
  // //   // }
  // //   updateStudent(updateStudent);
  // };

  return (
    <Dialog open={boolean} onClose={onToggle} fullWidth  >
      <Container>
        <DialogContent>
          <Grid container mb={3}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Edit Student
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
            // value={values.name}
            // onChange={handleChange}
            name="name"
            label="Student Name"
          />
          <TextField
            // value={values.pocEmail}
            // onChange={handleChange}
            name="Email"
            label="Student Email"
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button variant="contained"  > 
              Edit Student
            </Button>
          </DialogActions>
        </Box>
      </Container>
    </Dialog>
  );
};

export default EditStudentModal;
