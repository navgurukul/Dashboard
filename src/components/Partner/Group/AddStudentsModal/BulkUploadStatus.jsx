import { Circle, Download } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";

function BulkUploadStatus({ file, message }) {
  return (
    <Box
      sx={{
        border: `2px solid #BDBDBD`,
        borderRadius: "8px",
        mt: "16px",
        p: "16px",
      }}
    >
      <Typography mb={3} variant="subtitle1">
        {file?.name || "File name comes here"}
      </Typography>
      {/* <LinearProgress /> */}
      <Box mt={3}>
        <Typography mb="10px" variant="subtitle2">
          Upload Status
        </Typography>
        <Box>
          <Box display="flex" alignItems="center" gap="8px">
            <Circle sx={{ width: "8px", color: "#48A145" }} />
            <Typography variant="body2">50 Records Uploaded</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="8px">
            <Circle sx={{ width: "8px", color: "#FF6D60" }} />
            <Typography variant="body2">20 Records Failed</Typography>
          </Box>
        </Box>
        <Button sx={{ fontSize: "14px" }} endIcon={<Download />}>
          Download Failed Records
        </Button>
      </Box>
    </Box>
  );
}

export default BulkUploadStatus;
