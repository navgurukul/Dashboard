import { Skeleton, Typography } from "@mui/material";

import { useFetchSpacesQuery } from "../../store";
import SpaceItem from "./SpaceItem";

function SpaceList({ partner }) {
  const { data, isLoading, error } = useFetchSpacesQuery(partner);

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
    content = data.data.map((space) => {
      return <SpaceItem space={space} key={space.id} />;
    });
  }

  return <>{content}</>;
}
export default SpaceList;
