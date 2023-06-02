import { Add, SearchOutlined } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";

function GroupStudentsFilter({ handleAddStudentsOpen }) {
  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <TextField
        // label="Student Name, Email..."
        placeholder="Student Name, Email..."
        // size="medium"
        // value={searchTerm}
        // onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined sx={{ color: "#2E2E2E" }} />
            </InputAdornment>
          ),
          style: {
            height: "48px",
            borderRadius: "8px",
            fontSize: "14px",
          },
        }}
        sx={{ width: "360px" }}
      />
      <Button
        onClick={handleAddStudentsOpen}
        startIcon={<Add />}
        variant="contained"
        sx={{ fontSize: "14px" }}
      >
        Add Student(s)
      </Button>
    </Box>
  );
}
export default GroupStudentsFilter;
