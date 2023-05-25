import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";
import AddStudents from "../../../components/Partner/Group/AddStudents";

function GroupPage() {
  return (
    <div
      style={{
        backgroundColor: "#FAFAFA",
        width: "100%",
        paddingLeft: "20px",
      }}
    >
      <Typography sx={{ py: 2 }} variant="body2">
        Ahaan Bengaluru/ Student Group 1
      </Typography>
      <Stack spacing={2}>
        <Typography variant="subtitle2">Invite Link</Typography>
        <Typography variant="body2">
          The invite link can be shared with teachers or partners who can
          facilitate it to the students
        </Typography>
        <Grid sx={{ display: "flex", gap: 3 }}>
          <Button endIcon={<Link />} sx={{ fontSize: "14px" }}>
            Meraki App
          </Button>
          <Button endIcon={<Link />} sx={{ fontSize: "14px" }}>
            Meraki Web
          </Button>
          <Button endIcon={<Link />} sx={{ fontSize: "14px" }}>
            CRCA Platform
          </Button>
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle2">Student Members</Typography>
          <Typography variant="body2">
            Students will appear on the table once they login via the invite
            link. You man also add students manually
          </Typography>
        </Box>
      </Stack>
      <AddStudents />
    </div>
  );
}

export default GroupPage;
