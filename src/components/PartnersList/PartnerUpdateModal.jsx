import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import { useUpdatePartnerMutation } from "../../store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  border: "none",
};

function PartnerUpdateModal({ boolean, onOpen, partner }) {
  const [updatePartner, results] = useUpdatePartnerMutation();
  console.log(results);

  useEffect(() => {
    if (results.isSuccess) {
      alert(results.data.status);
      onOpen();
    } else if (results.isError) {
      alert(results.error.data.status);
    }
  }, [results, onOpen]);

  const [values, setValues] = useState({
    partnerId: partner.id,
    name: partner.name,
    point_of_contact_name: partner.point_of_contact_name,
    email: partner.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.point_of_contact_name.trim() ||
      !values.email.trim()
    ) {
      alert("fill all fields");
      return;
    } else {
      updatePartner(values);
    }
  };

  return (
    <div>
      <Modal
        open={boolean}
        onClose={() => onOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography>Update Partner</Typography>
            <TextField
              onChange={handleChange}
              value={values.name}
              name="name"
              label="Partner Name"
            />
            <TextField
              onChange={handleChange}
              value={values.point_of_contact_name}
              name="point_of_contact_name"
              label="Point of Contact Name"
            />
            <TextField
              onChange={handleChange}
              value={values.email}
              name="email"
              label="Point of Contact Email"
            />
            <Button variant="contained" onClick={handleSubmit}>
              Update Partner
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PartnerUpdateModal;
