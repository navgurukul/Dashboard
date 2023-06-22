import { List, ListItemButton, Typography } from "@mui/material";
import { useFetchGroupsQuery } from "../../../store";
import GroupItem from "./GroupItem";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

function GroupList({ space, handleCreateGroupToggle,handleCreateBatchToggle }) {
  const { data, loading, isError } = useFetchGroupsQuery(space);

  let content;
  if (loading) {
    content = <h1>Loading...</h1>;
  } else if (isError) {
    content = <p>Error fetching groups</p>;
  } else if (!data?.length) {
    content = (
      <Link to={`space/${space.id}`}>
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
      </Link>
    );
  } else {
    content = data.map((group) => {
      return <GroupItem group={group} key={group.id}
       handleCreateBatchToggle={handleCreateBatchToggle}/>;
    });
  }

  return <List>{content}</List>;
}

export default GroupList;
