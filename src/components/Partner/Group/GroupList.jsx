import { List, ListItemButton, Typography } from "@mui/material";
import { useFetchGroupsQuery } from "../../../store";
import GroupItem from "./GroupItem";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

function GroupList({ space }) {
  const { data, isLoading, error } = useFetchGroupsQuery(space);

  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const handleCreateGroupToggle = () => setCreateGroupOpen(!createGroupOpen);

  let content;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (error) {
    content = <Typography>Error fetching groups</Typography>;
  } else if (!data?.length) {
    content = (
      <>
        {createGroupOpen && (
          <CreateGroupModal
            onToggle={handleCreateGroupToggle}
            boolean={createGroupOpen}
            space={space}
          />
        )}

        <ListItemButton
          onClick={handleCreateGroupToggle}
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
              // fontWeight: index === selected ? 600 : 400,
            }}
          >
            Add Student Group
          </Typography>
        </ListItemButton>
      </>
    );
  } else {
    content = data.map((group) => {
      return <GroupItem group={group} key={group.id} />;
    });
  }

  return <List>{content}</List>;
}

export default GroupList;
