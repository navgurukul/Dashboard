import { Upload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useAddBulkStudentsMutation } from "../../../../store";
import showToast from "../../../showToast";
import BulkUploadStatus from "./BulkUploadStatus";
import * as XLSX from "xlsx";

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
  const [addBulkStudents, results] = useAddBulkStudentsMutation();
  const { groupId, partnerId } = useParams();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [resultsData, setResultsData] = useState(null);

  useEffect(() => {
    setResultsData(null);
  }, [file]);

  useEffect(() => {
    if (results.isSuccess) {
      setResultsData(results.data?.[0]);
      showToast("success", "Upload Status Ready");
    }
  }, [results.isSuccess]);

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

  const handleAddStudents = () => {
    const formData = new FormData();
    formData.append("partner_id", partnerId);
    formData.append("group_id", groupId);
    formData.append("file", file);
    addBulkStudents(formData);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleSampleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["name", "email"],
      ["jhon", "jhon@gmail.com"],
      ["andrew", "andrew@gmail.com"],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const fileName = "Sample_Student_Data.xlsx";

    const element = document.createElement("a");
    element.href = URL.createObjectURL(excelData);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
      {!file && (
        <Box mt={2} display="flex" alignItems="center">
          <Typography variant="body2" color="#6D6D6D">
            Format for student data:
          </Typography>
          <Button sx={{ fontSize: "14px" }} onClick={handleSampleDownload}>
            Sample_Student_Data.xlsx
          </Button>
        </Box>
      )}
      {message && <Message variant="body1">{message}</Message>}
      {file && (
        <BulkUploadStatus
          setResultsData
          results={results}
          status={resultsData}
          handleDelete={handleDeleteFile}
          file={file}
          message={message}
        />
      )}
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
