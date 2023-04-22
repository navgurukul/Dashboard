import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "../../store";
import { useState } from "react";
import PartnerAddModal from "./PartnerAddModal";

function PartnerSearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => {
    return state.partners.searchTerm;
  });
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  const handleModalToggle = () => {
    setOpenModal(!openModal);
  };

  return (
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
  );
}
export default PartnerSearchBar;
