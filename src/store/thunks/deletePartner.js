import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deletePartner = createAsyncThunk(
  "partner/delete",
  async ({ token, object }) => {
    console.log("delete thunk clicked", token, object);
    await axios.delete(
      `https://dev-api.navgurukul.org/apiDocs/partners/${object.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": `application/json`,
        },
      }
    );

    return object;
  }
);

export { deletePartner };
