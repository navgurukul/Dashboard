import { List, ListItemButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import BatchItem from "./BatchItem";
import { useFetchBatchesQuery } from "../../../store";

function BatchList({ group }) {
  const { data, isLoading, error } = useFetchBatchesQuery(group.id);

  let content;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (error) {
    content = <Typography>Error fetching groups</Typography>;
  } else if (!data?.length) {
    content = (
      <Link>
        <ListItemButton
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
            }}
          >
            Add a page
          </Typography>
        </ListItemButton>
      </Link>
    );
  } else {
    content = data.map((batch, index) => {
      return <BatchItem batch={batch} key={index} />;
    });
  }

  return <List>{content}</List>;
}

export default BatchList;
