import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRemoveSpaceMutation } from "../../store";
import UpdateSpaceModal from "./UpdateSpaceModal";

const ITEM_HEIGHT = 48;

function SpaceMenu({ space }) {
  const [removeSpace, results] = useRemoveSpaceMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openUpdateSpace, setOpenUpdateSpace] = useState(false);
  const handleOpenUpdateSpaceToggle = () => {
    setOpenUpdateSpace(!openUpdateSpace);
  };

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
      alert(results.data.status);
    }
  }, [results, handleDeleteClick]);

  return (
    <div>
      {openUpdateSpace && (
        <UpdateSpaceModal
          space={space}
          boolean={openUpdateSpace}
          onToggle={handleOpenUpdateSpaceToggle}
        />
      )}
      <Box
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ display: "flex", gap: "14px" }}
      >
        <MoreHorizIcon sx={{ color: "text.primary", fontSize: "16px" }} />
        <AddIcon sx={{ color: "text.primary", fontSize: "16px" }} />
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
            width: "14ch",
          },
        }}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default SpaceMenu;
