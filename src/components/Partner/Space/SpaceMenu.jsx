import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRemoveSpaceMutation } from "../../../store";
import UpdateSpaceModal from "./UpdateSpaceModal";
import showToast from "../../showToast";
import CreateGroupModal from "../Group/CreateGroupModal";

const ITEM_HEIGHT = 48;

function SpaceMenu({ space, expand }) {
  const [removeSpace, results] = useRemoveSpaceMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openUpdateSpace, setOpenUpdateSpace] = useState(false);
  const handleOpenUpdateSpaceToggle = () => {
    setOpenUpdateSpace(!openUpdateSpace);
  };

  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const handleCreateGroupToggle = () => setCreateGroupOpen(!createGroupOpen);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    removeSpace(space);
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleOpenUpdateSpaceToggle();
    setAnchorEl(null);
  };

  useEffect(() => {
    if (results.isSuccess) {
      showToast("success", results.data.status);
    }
  }, [results.isSuccess]);

  return (
    <div>
      {openUpdateSpace && (
        <UpdateSpaceModal
          space={space}
          boolean={openUpdateSpace}
          onToggle={handleOpenUpdateSpaceToggle}
        />
      )}

      {createGroupOpen && (
        <CreateGroupModal
          onToggle={handleCreateGroupToggle}
          boolean={createGroupOpen}
          space={space}
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
          onClick={() => {
            handleCreateGroupToggle();
            expand(true);
          }}
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
        <MenuItem onClick={handleClose}>Copy Link</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default SpaceMenu;
