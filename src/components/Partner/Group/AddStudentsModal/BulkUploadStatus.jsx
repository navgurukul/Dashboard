import { Circle, Delete, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

function BulkUploadStatus({ file, handleDelete, status }) {
  function convertToExcel(data) {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    // Create a Blob object from the buffer
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Generate a unique file name
    const fileName = "failed_records.xlsx";

    // Save the file using FileSaver.js
    saveAs(blob, fileName);
  }

  const handleDownload = () => {
    convertToExcel(status.reports);
  };

  return (
    <Box
      sx={{
        border: `2px solid #BDBDBD`,
        borderRadius: "8px",
        mt: "16px",
        p: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1">{file?.name}</Typography>
        <IconButton onClick={() => handleDelete()}>
          <Delete />
        </IconButton>
      </Box>
      {/* <LinearProgress /> */}
      {status && (
        <Box mt={3}>
          <Typography mb="10px" variant="subtitle2">
            Upload Status
          </Typography>
          <Box>
            <Box display="flex" alignItems="center" gap="8px">
              <Circle sx={{ width: "8px", color: "#48A145" }} />
              <Typography variant="body2">
                {status?.succes} Records Uploaded
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="8px">
              <Circle sx={{ width: "8px", color: "#FF6D60" }} />
              <Typography variant="body2">
                {status?.failed} Records Failed
              </Typography>
            </Box>
          </Box>
          {status?.failed > 0 && (
            <Button
              onClick={handleDownload}
              sx={{ fontSize: "14px" }}
              endIcon={<Download />}
            >
              Download Failed Records
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default BulkUploadStatus;
