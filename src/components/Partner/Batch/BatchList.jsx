import React, { useEffect, useState } from "react";
import { List, ListItemButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import BatchItem from "./BatchItem";
import axios from "axios";
function BatchList({ group }) {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    axios({
      url: `https://merd-api.merakilearn.org/partners/batches/${group.id}`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5Nzg4IiwiZW1haWwiOiJkYXlhQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjgxOTcwNDQzLCJleHAiOjE3MTM1MjgwNDN9.JBQD1zcEwpWHi743fxh-dQpVJ5vODAZvwTjihZZdm7A",
        "version-code": 50,
      },
    }).then((res) => {
      //   console.log(res);
      setBatchData(res.data);
    });
  }, []);

  let content;

  if (!batchData?.length) {
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
            Add Batches
          </Typography>
        </ListItemButton>
      </Link>
    );
  } else {
    content = batchData.map((batch, index) => {
      return <BatchItem batch={batch} key={index} />;
    });
  }

  return <List>{content}</List>;
}

export default BatchList;
