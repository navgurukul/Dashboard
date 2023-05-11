
import { TextField, Box, Button, Typography, InputAdornment, useMediaQuery,styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBy, changeSearchTerm } from "../../store";
import { useState } from "react";
import PartnerAddModal from "./PartnerAddModal";
import { SearchOutlined } from "@mui/icons-material";
import { breakpoints } from "../../theme/constant";

function PartnerFilter() {
  const [open, setOpen] = useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const dispatch = useDispatch();
  const { searchTerm, filterBy } = useSelector((state) => {
    return state.partnerFilter;
  });

  const filterTerms = [
    "All Partners",
    "Newly Onboarded",
    "Active",
    "Inactive",
    "Archived",
  ];

  const handleChange = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const filterButtons = filterTerms.map((term) => (
    <Button
      onClick={() => dispatch(changeFilterBy(term))}
      key={term}
      variant={term === filterBy ? "contained" : "outlined"}
      sx={{ mr: 1, borderRadius: "50px",borderColor:"#DCDCDC" }}
    >
      <Typography variant="body2" color= {term !== filterBy && "text.primary"}>
      {term}
      </Typography>
    </Button>
  ));
  return (
    <Box sx={{ mt: 8, mb: 2 }} >
      <Box display="flex" mb={3}>
        <TextField
          placeholder="Search Partner, Point of Contact..."
          size="medium"
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ color: "#2E2E2E" }} />
              </InputAdornment>
            ),
            style: ({
              height: "48px",
            })
          }}
          sx={{ flex: 1,}}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ marginLeft: "16px", }}
        >
          <Typography variant="subtitle2">Add Partner</Typography>
        </Button>
        {open && (
          <PartnerAddModal open={open} handleClose={handleClose} />
          )}
      </Box>
      {filterButtons}
    </Box>
  );
}
export default PartnerFilter;



