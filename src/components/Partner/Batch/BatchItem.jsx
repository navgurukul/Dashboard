import React from "react";
import { ListItemButton, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import BatchMenu from "./BatchMenu";

function BatchItem({ batch, spaceId }) {
  const { batchId } = useParams();

  return (
    <>
      <ListItemButton
        sx={{
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: 1,
          pl: 9.5,
          bgcolor: batchId == batch.recurring_id ? "#E9F5E9" : "",
          "&:hover": {
            bgcolor: batchId == batch.recurring_id ? "#E9F5E9" : "",
          },
        }}
      >
        {/* {expandIcon} */}
        <NavLink
          to={`space/${spaceId}/group/${batch.group_id}/batch/${batch.recurring_id}`}
          style={{ display: "flex", flexGrow: 1, color: "#2E2E2E" }}
        >
          <Typography
            flex={1}
            sx={{
              fontSize: "14px",
            }}
          >
            {batch.title}
          </Typography>
        </NavLink>
        <BatchMenu />
      </ListItemButton>
    </>
  );
}

export default BatchItem;
