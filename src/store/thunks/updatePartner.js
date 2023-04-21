import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updatePartner = createAsyncThunk(
  "partner/update",
  async ({ token, object }) => {
    const response = await axios.post(
      `https://https://dev-api.navgurukul.org/apiDocs/partners/${object.id}`,
      object,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": `application/json`,
        },
      }
    );
    return response.data;
  }
);

export { updatePartner };
