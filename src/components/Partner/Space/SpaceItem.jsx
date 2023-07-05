import {
  Box,
  Button,
  Collapse,
  IconButton,
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

function SpaceItem({ space }) {
  const [open, setOpen] = useState(false);
  const { spaceId, groupId } = useParams();

  const isActiveSpace = space.id == spaceId;

  const hasGroupId = Boolean(groupId);

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
      <ListItemButton
        sx={{
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor:
            isActiveSpace && hasGroupId ? "" : isActiveSpace ? "#E9F5E9" : "",
          "&:hover": {
            bgcolor: isActiveSpace && !hasGroupId ? "#E9F5E9" : "",
          },
        }}
      >
        {expandIcon}
        <NavLink
          to={`space/${space.id}`}
          style={{ display: "flex", flexGrow: 1, color: "#2E2E2E" }}
        >
          <img src={spaceItemSvg} alt="" />
          <Typography
            flex={1}
            sx={{
              fontSize: "14px",
              marginLeft: "10px",
              fontWeight: isActiveSpace && hasGroupId ? "bold" : "normal",
            }}
          >
            {space.space_name}
          </Typography>
        </NavLink>
        <SpaceMenu space={space} expand={setOpen} />
      </ListItemButton>
      {open && <GroupList space={space} />}
    </>
  );
}
export default SpaceItem;
