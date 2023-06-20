import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Upload } from "@mui/icons-material";
import BulkUploadStatus from "./BulkUploadStatus";

const DropzoneContainer = styled("div")(({ theme, isDragActive }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "14px",
  height: "183px",
  borderRadius: "8px",
  border: `2px dashed ${theme.palette.grey.main}`,
  backgroundColor: isDragActive
    ? theme.palette.success.light
    : theme.palette.background.default,
  color: theme.palette.text.primary,
  outline: "none",
  transition: "background-color .24s ease-in-out",
  cursor: "pointer",
  boxShadow: "none",
  marginRight: 0,
}));

const Message = styled(Typography)({
  marginTop: "16px",
  marginBottom: "16px",
});

const ButtonContainer = styled("div")({
  marginTop: "16px",
});

const BulkUpload = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  console.log(file);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      if (
        acceptedFiles[0].type === "text/csv" ||
        acceptedFiles[0].type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFile(acceptedFiles[0]);
        setMessage("");
      } else {
        setMessage("Invalid file type. Only CSV or XLSX files are allowed.");
      }
    } else {
      setMessage("Please drop only one file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleAddStudents = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("group_id", "72");
        formData.append("file", file);

        await axios.post(
          "https://merd-api.merakilearn.org/partner/students/upload",
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5Nzg4IiwiZW1haWwiOiJkYXlhQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjgxOTcwNDQzLCJleHAiOjE3MTM1MjgwNDN9.JBQD1zcEwpWHi743fxh-dQpVJ5vODAZvwTjihZZdm7A",
            },
          }
        );

        setMessage("File uploaded successfully!");
      } catch (error) {
        setMessage("Error uploading file. Please try again.");
      }
    } else {
      setMessage("Please select a file first.");
    }
  };

  return (
    <div>
      <DropzoneContainer
        {...getRootProps()}
        isDragActive={isDragActive}
        elevation={3}
      >
        <input {...getInputProps()} />
        <Upload sx={{ mt: "32px" }} />
        {isDragActive ? (
          <Typography variant="subtitle1">Drop the file here...</Typography>
        ) : (
          <Typography variant="subtitle1">Upload or drag file</Typography>
        )}
        <Typography variant="body2">xlsx or csv files are supported</Typography>
      </DropzoneContainer>
      {message && <Message variant="body1">{message}</Message>}
      <BulkUploadStatus file={file} message={message} />
      <ButtonContainer sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={!file}
          variant="contained"
          color="primary"
          onClick={handleAddStudents}
        >
          Add Student(s)
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default BulkUpload;
