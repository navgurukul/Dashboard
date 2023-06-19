import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import showToast from "../../showToast";
import EditGroupModal from "./EditGroupModal";
import { changeSelectedCourse, useDeleteGroupMutation } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
// import CreateBatchModal from "../CreateBatchModal";

const ITEM_HEIGHT = 48;

const options = [
  "Python",
  "Spoken English",
  "Typing",
  // "Climate Action",
  // "Scratch",
  // "Foundations of DSA",
  // "C4CA Projects",
];
function GroupMenu({ group, handleCreateBatchToggle }) {
  const [deleteGroup, results] = useDeleteGroupMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const openPathwayList = Boolean(anchorCourse);
  const selected_course = options[selectedIndex];

  const dispatch = useDispatch();

  useEffect(() => {
    showToast("success", results?.data?.message);
  }, [results.isSuccess]);

  const [openUpdateGroup, setOpenUpdateGroup] = useState(false);
  const handleOpenUpdateGroupToggle = () => {
    setOpenUpdateGroup(!openUpdateGroup);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleOpenUpdateGroupToggle();
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    deleteGroup(group);
  };

  const handleClickAdd = (event) => {
    setAnchorCourse(event.currentTarget);
  };

  const handleCloseAdd = () => {
    setAnchorCourse(null);
  };

  const handleMenuItemClick = (event, option) => {
    // setSelectedIndex(index);
    handleCreateBatchToggle();
    setAnchorCourse(null);
    dispatch(changeSelectedCourse(option));
  };

  const { courseName } = useSelector((state) => state.selectedCourse);
  // console.log(courseName);

  return (
    <div>
      {openUpdateGroup && (
        <EditGroupModal
          group={group}
          boolean={openUpdateGroup}
          onToggle={handleOpenUpdateGroupToggle}
        />
      )}
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
          // onClick={handleClickAdd}
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
            onClick={(event) => handleMenuItemClick(event, option)}
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
        <MenuItem onClick={handleEditClick}>Edit Details</MenuItem>
        <MenuItem>Copy Link</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default GroupMenu;
