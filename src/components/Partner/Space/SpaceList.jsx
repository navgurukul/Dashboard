import { List, Typography } from "@mui/material";

import { useFetchSpacesQuery } from "../../../store";
import SpaceItem from "./SpaceItem";
import { useState } from "react";

function SpaceList({ partner, handleCreateGroupToggle,handleCreateBatchToggle }) {
  const { data, isLoading, error } = useFetchSpacesQuery(partner);
  

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  let content;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (error) {
    content = (
      <Typography sx={{ fontSize: "14px", ml: 2 }}>
        Start out by creating the first space
      </Typography>
    );
  } else {
    content = data.data.map((space, i) => {
      return (
        <SpaceItem
          space={space}
          key={space.id}
          index={i}
          selected={selectedIndex}
          onClick={handleListItemClick}
          handleCreateGroupToggle={handleCreateGroupToggle}
          handleCreateBatchToggle={handleCreateBatchToggle}
        />
      );
    });
  }

  return (
    <>
      <List>{content}</List>
    </>
  );
}
export default SpaceList;
