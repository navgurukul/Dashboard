import {
  List,
  ListItemButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  CircularProgress
} from "@mui/material";
import { Add } from "@mui/icons-material";
import BatchItem from "./BatchItem";
import { useFetchBatchesQuery } from "../../../store";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeId, changeSelectedCourse } from "../../../store";
import axios from "axios";
import SidebarContext from "../Sidebar/sidebarContext";

const ITEM_HEIGHT = 48;

function BatchList({ group, expand }) {
  const { data, isLoading, error } = useFetchBatchesQuery(group.id);
  const { handleCreateBatchToggle } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [pathways, setPathways] = useState([]);
  const open = Boolean(anchorEl);
  const [addButtonClicked, setAddButtonClicked] = useState(false);

  // Taking the token from the Localstorage to use in API authorization
  const token = localStorage.getItem("token");

  // Fetch pathways when component mounts
  useEffect(() => {
    if (addButtonClicked) {
      axios({
        url: "https://merd-api.merakilearn.org/pathways/names",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:token,
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5Nzg4IiwiZW1haWwiOiJkYXlhQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjgxOTcwNDQzLCJleHAiOjE3MTM1MjgwNDN9.JBQD1zcEwpWHi743fxh-dQpVJ5vODAZvwTjihZZdm7A",
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

  const handleClick = (event) => {
    setAddButtonClicked(true);
    setAnchorEl(event.currentTarget);
    dispatch(changeId({ space_id: group.space_id, group_id: group.id }));
    expand(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, option) => {
    handleCreateBatchToggle();
    setAnchorEl(null);
    dispatch(changeSelectedCourse(option));
  };

  let content;
  if (isLoading) {
    content = <CircularProgress color="primary" />;
    // error
  } else if (data.length === 0 || error) {
    content = (
      <ListItemButton
        onClick={handleClick}
        sx={{
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: 1,
          pl: 5.5,
        }}
      >
        <Add sx={{ color: "#6d6d6d", width: "20px", height: "20px" }} />
        <Typography
          flex={1}
          sx={{
            fontSize: "14px",
          }}
        >
          Add a page
        </Typography>
      </ListItemButton>
    );
  } else {
    content = data?.batches_data?.map((batch, index) => {
      return <BatchItem batch={batch} key={index} spaceId={data.space_id} />;
    });
  }

  return (
    <List>
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
            width: "330px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // getContentAnchorEl={null}
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
      {content}
    </List>
  );
}

export default BatchList;
