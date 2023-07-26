import { List, ListItemButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import BatchItem from "./BatchItem";
import { useFetchBatchesQuery } from "../../../store";

function BatchList({ group }) {
  const { data, isLoading, error } = useFetchBatchesQuery(group.id);
// console.log(data);
  let content;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (error) {
    content = (
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
    );
  } else {
    content = data?.batches_data.map((batch, index) => {
      return <BatchItem batch={batch} key={index} spaceId={data.space_id} />;
    });
  }

  return <List>{content}</List>;
}

export default BatchList;
