import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import SpaceMenu from "./SpaceMenu";
import spaceItemSvg from "../assets/spaceitem.svg";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useState } from "react";
import GroupList from "../Group/GroupList";

function SpaceItem({ space, handleCreateGroupToggle }) {
  const [open, setOpen] = useState(false);

  const activeStyles = {
    backgroundColor: "#E9F5E9",
    fontWeight: 600,
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const expandIcon = open ? (
    <ExpandLess sx={{ color: "#6d6d6d" }} onClick={handleClick} />
  ) : (
    <ExpandMore sx={{ color: "#6d6d6d" }} onClick={handleClick} />
  );

  return (
    <>
      <NavLink to={`space/${space.id}`}>
        <ListItemButton
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {expandIcon}
          <img src={spaceItemSvg} alt="" />
          <Typography
            flex={1}
            sx={{
              fontSize: "14px",
              // fontWeight: index === selected ? 600 : 400,
            }}
          >
            {space.space_name}
          </Typography>
          <SpaceMenu
            space={space}
            handleCreateGroupToggle={handleCreateGroupToggle}
          />
        </ListItemButton>
      </NavLink>
      {open && (
        <GroupList
          space={space}
          handleCreateGroupToggle={handleCreateGroupToggle}
        />
      )}
    </>
  );
}
export default SpaceItem;