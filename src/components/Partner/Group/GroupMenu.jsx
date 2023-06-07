import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import showToast from "../../showToast";
import EditGroupModal from "./EditGroupModal";
import { useDeleteGroupMutation } from "../../../store";

const ITEM_HEIGHT = 48;

function GroupMenu({ group }) {
  const [deleteGroup, results] = useDeleteGroupMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log(results);

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
        <AddIcon
          // onClick={handleCreateGroupToggle}
          sx={{ color: "text.primary", fontSize: "16px" }}
        />
      </Box>
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
