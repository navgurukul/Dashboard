import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updatePartner = createAsyncThunk(
  "partner/update",
  async ({ token, object }) => {
    const body = {
      name: object.name,
      point_of_contact_name: object.pocName,
      email: object.pocEmail,
      status: object.status,
    };
    const response = await axios.put(
      `https://dev-api.navgurukul.org/apiDocs/partners/${object.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": `application/json`,
        },
      }
    );
    console.log(response.data["Update data"]);
    const data = { ...response.data["Update data"], id: object.id };
    console.log(data);
    return data;
  }
);

export { updatePartner };
