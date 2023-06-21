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
import axios from "axios";

const ITEM_HEIGHT = 48;

function GroupMenu({ group, handleCreateBatchToggle }) {
  const [deleteGroup, results] = useDeleteGroupMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const openPathwayList = Boolean(anchorCourse);
  const [pathways, setPathways] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    showToast("success", results?.data?.message);
  }, [results.isSuccess]);

  useEffect(() => {
    axios({
      url: "https://dev-api.merakilearn.org/pathways/dropdown",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5Nzg4IiwiZW1haWwiOiJkYXlhQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjgxOTcwNDQzLCJleHAiOjE3MTM1MjgwNDN9.JBQD1zcEwpWHi743fxh-dQpVJ5vODAZvwTjihZZdm7A",
        "version-code": 50,
      },
    }).then((res) => {
      const path = res?.data?.pathways?.map((item, index) => {
        return {
          label: item.name,
          pathway_id: item.id,
        };
      });
      setPathways(path);
    });
  }, []);

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
    handleCreateBatchToggle();
    setAnchorCourse(null);
    dispatch(changeSelectedCourse(option));
  };

  const { courseName } = useSelector((state) => state.selectedCourse);

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
            width: "330px",
          },
        }}
      >
        {pathways?.map((course, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, course)}
          >
            {course?.label}
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
