import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";
import AddStudents from "../../../components/Partner/Group/AddStudents";
import { useParams } from "react-router-dom";
import {
  useFetchSingleGroupQuery,
  useFetchSingleSpaceQuery,
  useFetchStudentsQuery,
} from "../../../store";
import AddStudentsModal from "../../../components/Partner/Group/AddStudentsModal/AddStudentsModal";
import { useState } from "react";
import GroupStudentsTable from "../../../components/Partner/Group/GroupStudentsTable";

function GroupPage() {
  const { spaceId, groupId } = useParams();

  const {
    data: spaceData,
    isLoading: spaceIsLoading,
    error: spaceError,
  } = useFetchSingleSpaceQuery(spaceId);

  const {
    data: groupData,
    isLoading: groupIsLoading,
    error: groupError,
  } = useFetchSingleGroupQuery(groupId);
  const space = spaceData?.data?.[0];
  const group = groupData?.[0];

  const {
    data: studentsData,
    isLoading: isStudentsLoading,
    error: studentsError,
  } = useFetchStudentsQuery(groupId);
  // console.log(studentsData);

  const [addStudentsOpen, setAddStudentsOpen] = useState(false);
  const handleAddStudentsOpen = () => setAddStudentsOpen(!addStudentsOpen);

  let content;
  if (isStudentsLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (!studentsData?.length) {
    content = <AddStudents handleAddStudentsOpen={handleAddStudentsOpen} />;
  } else {
    content = (
      <GroupStudentsTable
        handleAddStudentsOpen={handleAddStudentsOpen}
        data={studentsData}
      />
    );
  }

  return (
    <>
      {addStudentsOpen && (
        <AddStudentsModal
          boolean={addStudentsOpen}
          onToggle={handleAddStudentsOpen}
        />
      )}
      <div
        style={{
          backgroundColor: "#FAFAFA",
          width: "100%",
          height: "max-content",
          paddingLeft: "20px",
          border: "5px solid black",
          height: "calc (100vh - 80px)"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
          <Typography pr={0.5} variant="body2">
            {space?.space_name}
          </Typography>
          <Typography variant="body2" color="primary.main">
            / {group?.group_name}
          </Typography>
        </Box>
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
              C4CA Platform
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
        {content}
      </div>
    </>
  );
}

export default GroupPage;
