import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePartner } from "../../store";
// import { useAddPartnerMutation } from "../../store/apis/partnersApi";

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
  // const [addPartner, results] = useAddPartnerMutation();
  console.log(partner);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [values, setValues] = useState({
    id: partner.id,
    name: partner.name,
    pocName: partner.point_of_contact_name,
    pocEmail: partner.email,
    status: partner.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.pocName.trim() ||
      !values.pocEmail.trim() ||
      !values.status
    ) {
      return;
    } else {
      onOpen();
      setValues({
        name: "",
        pocName: "",
        pocEmail: "",
        status: "",
      });
      dispatch(updatePartner({ token, object: values }));
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
              value={values.pocName}
              name="pocName"
              label="Point of Contact Name"
            />
            <TextField
              onChange={handleChange}
              value={values.pocEmail}
              name="pocEmail"
              label="Point of Contact Email"
            />
            <TextField
              onChange={handleChange}
              value={values.status}
              name="status"
              label="Status"
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
