import { ListItemButton, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import GroupMenu from "./GroupMenu";
import BatchList from "../Batch/BatchList";

function GroupItem({ group }) {
  const [open, setOpen] = useState(false);
  const { groupId } = useParams();

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
      <ListItemButton
        // selected={index === selected}
        sx={{
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: 1,
          pl: 5.5,
          // backgroundColor: group.id === parseInt(groupId) ? "red" : "",
          // "&:hover": {
          //   backgroundColor: group.id === parseInt(groupId) ? "red" : "",
          // },
        }}
      >
        {expandIcon}
        <NavLink
          to={`space/${group.space_id}/group/${group.id}`}
          style={{ display: "flex", flexGrow: 1, color: "#2E2E2E" }}
        >
          <Typography
            flex={1}
            sx={{
              fontSize: "14px",
              // fontWeight: index === selected ? 600 : 400,
            }}
          >
            {group.group_name}
          </Typography>
        </NavLink>
        <GroupMenu group={group} expand={setOpen} />
      </ListItemButton>
      {open && <BatchList group={group} />}
    </>
  );
}
export default GroupItem;
