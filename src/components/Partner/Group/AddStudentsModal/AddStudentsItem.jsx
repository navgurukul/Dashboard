import { Delete } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";

function AddStudentsItem({ student, index, onDelete, onChange, length }) {
  const handleDeleteClick = () => {
    onDelete(student.id);
  };

  const handleEditClick = (e) => {
    onChange(e, student.id);
  };

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <TextField
        onChange={(e) => handleEditClick(e)}
        margin="dense"
        fullWidth
        name="name"
        label={`Student Name ${index + 1}`}
        InputProps={{
          style: {
            borderRadius: "8px",
          },
        }}
      />
      <TextField
        onChange={(e) => handleEditClick(e)}
        margin="dense"
        fullWidth
        name="email"
        label={`Email ${index + 1}`}
        InputProps={{
          style: {
            borderRadius: "8px",
          },
        }}
      />
      <IconButton
        onClick={handleDeleteClick}
        disabled={length === 1 ? true : false}
      >
        <Delete bgcolor="#BDBDBD" />
      </IconButton>
    </Stack>
  );
}
export default AddStudentsItem;
