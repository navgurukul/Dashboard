import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPartners = createAsyncThunk("partners/fetch", async (token) => {
  const response = await axios.get(
    "https://dev-api.navgurukul.org/apiDocs/partners",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
});

export { fetchPartners };
