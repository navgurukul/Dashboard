import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box, Select } from "@mui/material";
import { useEffect, useState } from "react";
import showToast from "../../showToast";
import CreateBatchModal from "../CreateBatchModal";
// import BatchMenu from './BatchMenu';

const ITEM_HEIGHT = 48;
const options = [
  "Python",
  "Spoken English",
  "Typing",
  "Climate Action",
  "Scratch",
  "Foundations of DSA",
  "C4CA Projects",
];
const optionsForEdit = ["Edit Details", "Copy Link", "Delete"];

function GroupMenu({ group, handleCreateBatchToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const open = Boolean(anchorEl);
  const openPathwayList = Boolean(anchorCourse);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditMenu = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClickAdd = (event) => {
    // handleCreateBatchToggle();
    setAnchorCourse(event.currentTarget);
  };

  const handleCloseAdd = () => {
    setAnchorCourse(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    const saw = options[selectedIndex];
    handleCreateBatchToggle(saw);
    setAnchorCourse(null);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ display: "flex", gap: "14px", marginRight: "8px" }}
        >
          <MoreHorizIcon sx={{ color: "text.primary", fontSize: "16px" }} />
        </Box>
        <Box
          aria-label="more"
          id="long-button"
          aria-controls={openPathwayList ? "long-menu" : undefined}
          aria-expanded={openPathwayList ? "true" : undefined}
          aria-haspopup="true"
        >
          <AddIcon
            onClick={handleClickAdd}
            sx={{ color: "text.primary", fontSize: "16px" }}
          />
        </Box>
      </Box>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorCourse}
        open={openPathwayList}
        onClose={handleCloseAdd}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 7.5,
            width: "200px",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "140px",
          },
        }}
      >
        {optionsForEdit.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleEditMenu(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default GroupMenu;
