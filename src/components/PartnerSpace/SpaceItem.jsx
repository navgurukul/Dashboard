import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SpaceMenu from "./SpaceMenu";

function SpaceItem({ space }) {
  return (
    <Link
      to={`space/${space.id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Button
        sx={{
          m: 2,
          color: "text.primary",
          bgcolor: "success.light",
          width: "88%",
          display: "flex",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>{space.space_name}</Typography>
        <SpaceMenu space={space} />
      </Button>
    </Link>
  );
}
export default SpaceItem;
