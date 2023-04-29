import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addPartner = createAsyncThunk(
  "partner/add",
  async ({ token, object }) => {
    const body = {
      name: object.name,
      point_of_contact_name: object.pocName,
      email: object.pocEmail,
    };
    const response = await axios.post(
      "https://dev-api.navgurukul.org/apiDocs/partners/create/newpartner",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": `application/json`,
        },
      }
    );
    console.log(response);
    const data = response.data.data[0];
    return data;
  }
);

export { addPartner };
