import { List, Typography } from "@mui/material";

import { useFetchSpacesQuery } from "../../../store";
import SpaceItem from "./SpaceItem";
import { useState } from "react";

function SpaceList({ partner, handleCreateBatchToggle }) {
  const { data, isLoading, error } = useFetchSpacesQuery(partner);

  const [selectedIndex, setSelectedIndex] = useState(-1);

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
