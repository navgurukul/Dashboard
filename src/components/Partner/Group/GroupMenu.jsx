import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box,Select } from "@mui/material";
import { useEffect, useState } from "react";
import showToast from "../../showToast";
import CreateBatchModal from "../CreateBatchModal";

const ITEM_HEIGHT = 48;

function GroupMenu({ group }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const open = Boolean(anchorEl);
  const openPathwayList = Boolean(anchorCourse);
  const [createBatchOpen, setCreateBatchOpen] = useState(false);
  const handleCreateBatchToggle = () => setCreateBatchOpen(!createBatchOpen);
  // const [selectedPath, setSelectedPath]= useState("");

  console.log(anchorCourse);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAdd = (event) => {
    setAnchorCourse(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorCourse(null);
  };
  // handleCreateBatchDropdown = () => {
  //   return(
  //     <>
  //     {/* <CreateBatchModal/> */}
  //     </>
  //   )
  // };
  return (
    <div>
      {createBatchOpen && (
        <CreateBatchModal
          onToggle={handleCreateBatchToggle}
          boolean={createBatchOpen}
          // selectedPath= {selectedPath}
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
        onClick={handleClickAdd}>
          <AddIcon
          // onClick={handleCreateBatchToggle}
          // onClick= {<CreateBatchModal/>}
          sx={{ color: "text.primary", fontSize: "16px" }}
        />
        </Box>
        
      </Box>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorCourse={anchorCourse}
        open={openPathwayList}
        onClose={handleClose}
        onClick={handleCreateBatchToggle}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: "140px",
        //   },
        // }}
      >
        <MenuItem>Python</MenuItem>
        <MenuItem>Spoken English</MenuItem>
        <MenuItem>Typing</MenuItem>
        <MenuItem>Climate Action</MenuItem>
        <MenuItem>Scratch</MenuItem>
        <MenuItem>Foundations of DSA</MenuItem>
        <MenuItem>C4CA Projects</MenuItem>
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
        <MenuItem>Edit Details</MenuItem>
        <MenuItem>Copy Link</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default GroupMenu;
