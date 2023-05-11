import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPartner } from "../../store";
// import { useAddPartnerMutation } from "../../store/apis/partnersApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PartnerAddModal({ boolean, onOpen }) {
  // const [addPartner, results] = useAddPartnerMutation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [values, setValues] = useState({
    name: "",
    pocName: "",
    pocEmail: "",
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
      !values.pocEmail.trim()
    ) {
      return;
    } else {
      onOpen();
      setValues({
        name: "",
        pocName: "",
        pocEmail: "",
      });
      dispatch(addPartner({ token, object: values }));
      // addPartner(values);
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
