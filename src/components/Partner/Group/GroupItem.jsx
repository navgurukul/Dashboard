import { ListItemButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import GroupMenu from "./GroupMenu";
import BatchList from "../Batch/BatchList";

function GroupItem({ group, handleCreateBatchToggle }) {
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
      <NavLink to={`space/${group.space_id}/group/${group.id}`}>
        <ListItemButton
          // selected={index === selected}
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 5.5,
          }}
        >
          {expandIcon}
          <Typography
            flex={1}
            sx={{
              fontSize: "14px",
              // fontWeight: index === selected ? 600 : 400,
            }}
          >
            {group.group_name}
          </Typography>
          <GroupMenu
            group={group}
            handleCreateBatchToggle={handleCreateBatchToggle}
          />
        </ListItemButton>
      </NavLink>
      {open && (
        <BatchList
          group={group}
          // handleCreateBatchToggle={handleCreateBatchToggle}
        />
      )}
    </>
  );
}
export default GroupItem;
