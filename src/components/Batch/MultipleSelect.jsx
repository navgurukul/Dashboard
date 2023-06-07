import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MultipleSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div style={{}}>
      <FormControl sx={{ m: 0.5, minWidth: 360 }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ fontSize: "14px" }} // Update the padding here
        >
          Choose Class
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ height: 48, padding: 0, fontSize: "16px" }}
        >
          <MenuItem value="">
            <p>None</p>
          </MenuItem>
          <MenuItem value={10} style={{ fontSize: "16px" }}>
            Class-1 Introduction to Python
          </MenuItem>
          <MenuItem value={10} style={{ fontSize: "16px" }}>
            Class-2 Introduction to Python
          </MenuItem>
          <MenuItem value={10} style={{ fontSize: "16px" }}>
            Class-3 Introduction to Python
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
