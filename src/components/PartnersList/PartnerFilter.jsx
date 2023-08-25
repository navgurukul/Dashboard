import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
  useMediaQuery,
  styled,
} from "@mui/material";
import { SearchOutlined, Add } from "@mui/icons-material";
import { changeFilterBy, changeSearchTerm } from "../../store";
import PartnerAddModal from "./PartnerAddModal";
import { breakpoints } from "../../theme/constant";

function PartnerFilter() {
  const [openModal, setOpenModal] = useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const dispatch = useDispatch();

  const { searchTerm, filterBy } = useSelector((state) => state.partnerFilter);

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
          placeholder="Search Partner..."
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
        <Box sx={{ position: "relative" }}>
          <Button
            startIcon={<Add />}
            onClick={handleModalToggle}
            variant="contained"
            sx={{}}
          >
            <Typography variant="subtitle2">Add Partner</Typography>
          </Button>
          {openModal && (
            <Box sx={{ position: "absolute", top: "100%", left: 0 }}>
              <PartnerAddModal onOpen={handleModalToggle} boolean={openModal} />
            </Box>
          )}
        </Box>
      </Box>
      {filterButtons}
    </Box>
  );
}

export default PartnerFilter;
