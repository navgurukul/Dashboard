import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addPartner = createAsyncThunk(
  "partner/add",
  async ({ token, object }) => {
    const response = await axios.post(
      "https://https://dev-api.navgurukul.org/apiDocs/partners/create/newpartner",
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

export { addPartner };
