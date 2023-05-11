import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useAddPartnerMutation } from "../../store";

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

function PartnerAddModal({ boolean, onOpen }) {
  const [addPartner, results] = useAddPartnerMutation();
  console.log(results);
  const [values, setValues] = useState({
    name: "",
    point_of_contact_name: "",
    email: "",
  });

  useEffect(() => {
    if (results.isSuccess) {
      alert(results.data.status);
      onOpen();
    } else if (results.isError) {
      alert(results.error.data.Error);
    }
  }, [results, onOpen]);

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
      alert("Fill all fields");
      return;
    } else {
      addPartner(values);
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={boolean}
        onClose={() => onOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography>New Partner</Typography>
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
              Create a partner
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PartnerAddModal;
