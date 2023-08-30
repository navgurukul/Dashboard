import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import showToast from "../../showToast";
import EditGroupModal from "./EditGroupModal";
import {
  changeId,
  changeSelectedCourse,
  useDeleteGroupMutation,
} from "../../../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import SidebarContext from "../Sidebar/sidebarContext";
import CustomDeleteAlert from "../../CustomDeleteAlert/CustomDeleteAlert";

const ITEM_HEIGHT = 48;
const baseUrl = "https://merd-api.merakilearn.org"
function GroupMenu({ group, expand }) {
  const [deleteGroup, results] = useDeleteGroupMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const openPathwayList = Boolean(anchorCourse);
  const [pathways, setPathways] = useState([]);
  const { handleCreateBatchToggle } = useContext(SidebarContext);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const dispatch = useDispatch();

  // Taking the token from the Localstorage to use in API authorization
  const userLocalData = JSON.parse(localStorage.getItem("AUTH"));

  useEffect(() => {
    showToast("success", results?.data?.message);
  }, [results.isSuccess]);

  useEffect(() => {
    if (addButtonClicked) {
      axios({
        url: `${baseUrl}/pathways/names`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: userLocalData?.token,
          "version-code": 50,
        },
      }).then((res) => {
        const path = res?.data?.map((item, index) => {
          return {
            label: item.name,
            pathway_id: item.id,
          };
        });
        setPathways(path);
      });
      setAddButtonClicked(false);
    }
  }, [addButtonClicked]);

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

  const handleClickAdd = (event) => {
    const currentTarget = event.currentTarget;
    setAnchorCourse(currentTarget);
    setAddButtonClicked(true);
    setShowConsentModal(false);
    dispatch(changeId({ space_id: group.space_id, group_id: group.id }));
    expand(true);
  };

  const handleCloseAdd = () => {
    setAnchorCourse(null);
  };

  const handleMenuItemClick = (event, option) => {
    axios({
      method: "GET",
      url: `${baseUrl}/users/calendar/tokens`,
      headers: {
        accept: "application/json",
        Authorization: userLocalData?.token,
        "version-code": 50,
      },
    }).then((res) => {
      if (res.data.success) {
        handleCreateBatchToggle();
        setAnchorCourse(null);
        dispatch(changeSelectedCourse(option));
      } else {
        setShowConsentModal(true);
      }
    });
  };

  const codeGenerate = async () => {
    axios({
      method: "GET",
      url: `${baseUrl}/users/calendar/generateAuthURL?choose=partnerdashboard`,
      headers: {
        accept: "application/json",
        Authorization: userLocalData?.token,
        "version-code": 50,
      },
    }).then((res) => {
      window.location.href = res.data.url;
    });
  };

  const [openDelAlert, setDeleteAlert] = useState(false);

  const handleDeleteClick = () => {
    setDeleteAlert(!openDelAlert);
    setAnchorEl(null);
  };

  const deleteSpace = () => {
    deleteGroup(group);
  };

  // const handleDeleteClick = () => {
  //   deleteGroup(group)
  // };

  return (
    <Box sx={{ display: "flex", marginLeft: "auto" }}>
      {openUpdateGroup && (
        <EditGroupModal
          group={group}
          boolean={openUpdateGroup}
          onToggle={handleOpenUpdateGroupToggle}
        />
      )}
      {openDelAlert && (
        <CustomDeleteAlert
          boolean={openDelAlert}
          onToggle={handleDeleteClick}
          deleteSpace={deleteSpace}
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
            onClick={(e) => {
              handleClickAdd(e);
              // expand(true);
            }}
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
        {pathways?.map((course, index) => {
          if (
            course.label === "Python" ||
            course.label === "Spoken English" ||
            course.label === "Amazon Coding Bootcamp"
          ) {
            return (
              <MenuItem
                key={index}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, course)}
              >
                {course?.label}
              </MenuItem>
            );
          }
        })}
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
      {showConsentModal ? (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              minWidth: "45%",
              borderRadius: 8,
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h6" align="center">
              Meraki needs access to your calendar to create classes. <br />
              Do you want to go ahead?
            </Typography>
          </DialogTitle>
          <Stack alignItems="center">
            <DialogActions>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Button
                  onClick={codeGenerate}
                  color="error"
                  variant="contained"
                  sx={{ mr: "15px", width: "100px" }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setShowConsentModal(false)}
                  color="grey"
                  variant="contained"
                  sx={{ width: "100px" }}
                >
                  No
                </Button>
              </Box>
            </DialogActions>
          </Stack>
        </Dialog>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default GroupMenu;
