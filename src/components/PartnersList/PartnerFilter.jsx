import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBy, changeSearchTerm } from "../../store";
import { useState } from "react";
import PartnerAddModal from "./PartnerAddModal";
import { SearchOutlined } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

function PartnerFilter() {
  const [openModal, setOpenModal] = useState(false);

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

  const handleModalToggle = () => {
    setOpenModal(!openModal);
  };

  const filterButtons = filterTerms.map((term) => (
    <Button
      onClick={() => dispatch(changeFilterBy(term))}
      key={term}
      variant={term === filterBy ? "contained" : "outlined"}
      sx={{
        mr: 2,
        borderRadius: "18px",
        borderColor: "#DCDCDC",
        p: "12px",
      }}
    >
      <Typography variant="body2" color={term !== filterBy && "text.primary"}>
        {term}
      </Typography>
    </Button>
  ));
  return (
    <Box sx={{ mt: 8, mb: 2 }}>
      <Box display="flex" justifyContent={"space-between"} mb={3}>
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
            style: {
              height: "48px",
              borderRadius: "8px",
              fontSize: "14px",
            },
          }}
          sx={{ width: "360px" }}
        />
        <Button
          startIcon={<Add />}
          onClick={handleModalToggle}
          variant="contained"
          sx={{}}
        >
          <Typography variant="subtitle2">Add Partner</Typography>
        </Button>
        {openModal && (
          <PartnerAddModal onOpen={handleModalToggle} boolean={openModal} />
        )}
      </Box>
      {filterButtons}
    </Box>
  );
}
export default PartnerFilter;
