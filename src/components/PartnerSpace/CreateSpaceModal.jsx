import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useAddSpaceMutation } from "../../store";
import { useParams } from "react-router-dom";
import showToast from "../showToast";

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

const CreateSpaceModal = ({ boolean, onToggle }) => {
  const { partnerId } = useParams();
  const [addSpace, results] = useAddSpaceMutation();
  console.log(results);
  const [values, setValues] = useState({
    name: "",
    pocName: "",
    pocEmail: "",
  });

  useEffect(() => {
    if (results.isError) {
      showToast("error", results.error.data.Error);
    } else if (results.isSuccess) {
      showToast("success", results.data.status);
      onToggle();
    }
  }, [results.isSuccess, results.isError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    let space = {};
    space.partnerId = partnerId;
    space["space_name"] = "";
    if (values.name.trim()) {
      space["space_name"] = values.name;
    }
    if (values.pocName.trim()) {
      space["point_of_contact_name"] = values.pocName;
    }
    if (values.pocEmail.trim()) {
      space["email"] = values.pocEmail;
    }
    addSpace(space);
  };

  return (
    <Box>
      <Modal
        open={boolean}
        onClose={onToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6">New Space</Typography>
            <TextField
              value={values.name}
              onChange={handleChange}
              name="name"
              label="Space Name"
            />
            <Typography variant="body2" color="#6D6D6D">
              Please fill the below fields if individual POC is required for
              this space apart from the Partner's main POC
            </Typography>
            <TextField
              name="pocName"
              label="Point of Contact Name (Optional)"
              value={values.pocName}
              onChange={handleChange}
            />
            <TextField
              value={values.pocEmail}
              onChange={handleChange}
              name="pocEmail"
              label="Point of Contact (Optional)"
            />
            <Button onClick={handleSubmit} variant="contained">
              Create a space
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateSpaceModal;
