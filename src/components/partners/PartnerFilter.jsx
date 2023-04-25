import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBy, changeSearchTerm } from "../../store";
import { useState } from "react";
import PartnerAddModal from "./PartnerAddModal";

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
      color={term === filterBy ? "success" : "secondary"}
      variant="contained"
    >
      {term}
    </Button>
  ));

  return (
    <Box>
      <Box display="flex">
        <TextField
          id="outlined-controlled"
          label="Search partner"
          placeholder="Search partner"
          value={searchTerm}
          onChange={handleChange}
          sx={{ flex: 1, height: "48px" }}
        />
        <Button
          onClick={handleModalToggle}
          variant="text"
          sx={{ marginLeft: "16px", height: "48px" }}
        >
          Add Partner
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
