import { Box } from "@mui/material";
import AddStudentsItem from "./AddStudentsItem";

function AddStudentsList({ students, onDelete, onChange }) {
  const renderedStudentsList = students.map((student, index) => {
    return (
      <AddStudentsItem
        onChange={onChange}
        length={students.length}
        student={student}
        index={index}
        onDelete={onDelete}
        key={student.id}
      />
    );
  });
  return <Box>{renderedStudentsList}</Box>;
}
export default AddStudentsList;
