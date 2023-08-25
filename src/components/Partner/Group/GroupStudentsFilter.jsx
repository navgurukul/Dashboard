import { Add, SearchOutlined } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm } from "../../../store";

function GroupStudentsFilter({ handleAddStudentsOpen }) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => {
    return state.partnerFilter;
  });

  const handleChange = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <TextField
        placeholder="Student Name..."
        value={searchTerm}
        onChange={handleChange}
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
