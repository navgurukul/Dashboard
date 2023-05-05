import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRemoveSpaceMutation } from "../../store";

const ITEM_HEIGHT = 48;

function SpaceMenu({ space }) {
  const [removeSpace, results] = useRemoveSpaceMutation();
  console.log(results);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  useEffect(() => {
    if (results.isSuccess) {
      alert(results.data.status);
    }
  }, [results, handleDeleteClick]);

  return (
    <div>
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default SpaceMenu;
