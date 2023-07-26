import { Delete } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useCheckEmailQuery } from "../../../../store";
import { useState } from "react";

function AddStudentsItem({ student, index, onDelete, onChange, length }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { data, isLoading, error } = useCheckEmailQuery(email);

  const handleDeleteClick = () => {
    onDelete(student.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
    onChange(e, student.id);
  };

  return (
    <Box mb={1}>
      <Stack direction="row" gap={2} alignItems="center">
        <TextField
          value={name}
          onChange={handleInputChange}
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
          value={email}
          onChange={handleInputChange}
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
      <Typography sx={{ fontSize: "14px", color: "red", height: "20px" }}>
        {error?.data?.message &&
          `This student is already associated with "${error.data.name}"`}
      </Typography>
    </Box>
  );
}

export default AddStudentsItem;
