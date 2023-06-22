import React from "react";
import { ListItemButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import BatchMenu from "./BatchMenu";

function BatchItem({ batch }) {
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
      <NavLink>
        <ListItemButton
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 9.5,
          }}
        >
          {/* {expandIcon} */}
          <Typography
            flex={1}
            sx={{
              fontSize: "14px",
            }}
          >
            {batch}
          </Typography>
          <BatchMenu />
        </ListItemButton>
      </NavLink>
    </>
  );
}
export default BatchItem;
