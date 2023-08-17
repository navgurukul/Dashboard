import { Box, Button, Grid, Stack, Typography, CircularProgress } from "@mui/material";
import { Link } from "@mui/icons-material";
import AddStudents from "../../../components/Partner/Group/AddStudents";
import { useParams } from "react-router-dom";
import {
  clearSearchTerm,
  useFetchSingleGroupQuery,
  useFetchSingleSpaceQuery,
  useFetchStudentsQuery,
  useGetLinksMutation,
} from "../../../store";
import AddStudentsModal from "../../../components/Partner/Group/AddStudentsModal/AddStudentsModal";
import { useEffect, useState } from "react";
import GroupStudentsTable from "../../../components/Partner/Group/GroupStudentsTable";
import showToast from "../../../components/showToast";
import { useSelector, useDispatch } from "react-redux";

function GroupPage() {
  const { partnerId, spaceId, groupId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSearchTerm());
  }, [groupId]);

  const {
    data: spaceData,
    isLoading: spaceIsLoading,
    error: spaceError,
  } = useFetchSingleSpaceQuery(spaceId);

  const {
    data: studentsData,
    isLoading: isStudentsLoading,
    error: studentsError,
  } = useFetchStudentsQuery(groupId);

  const {
    data: groupData,
    isLoading: groupIsLoading,
    error: groupError,
    refetch: refetchGroup,
  } = useFetchSingleGroupQuery(groupId);
  const space = spaceData?.data?.[0];
  const group = groupData?.[0];

  const [getLinks, results] = useGetLinksMutation();

  useEffect(() => {
    refetchGroup({ forceRefetch: true });
    if (group && !group.web_link) {
      getLinks({ groupId, spaceId, partnerId });
    }
  }, [groupId, group]);
  const linksData = results.data;

  const [addStudentsOpen, setAddStudentsOpen] = useState(false);
  const handleAddStudentsOpen = () => setAddStudentsOpen(!addStudentsOpen);

  const { filteredData } = useSelector(({ partnerFilter: { searchTerm } }) => {
    let lowerCased = searchTerm?.toLowerCase();
    const filteredData = studentsData?.filter((student) => {
      return student.name.toLowerCase().includes(lowerCased);
    });
    return {
      filteredData,
    };
  });

  let content;
  if (isStudentsLoading) {
    content = <CircularProgress color="primary" />;
  } else if (!studentsData?.length) {
    content = <AddStudents handleAddStudentsOpen={handleAddStudentsOpen} />;
  } else {
    content = (
      <GroupStudentsTable
        handleAddStudentsOpen={handleAddStudentsOpen}
        data={filteredData}
      />
    );
  }

  const handleLinkCopy = (linkType) => {
    let link;
    switch (linkType) {
      case "merakiApp":
        link = group?.android_link ?? linksData?.android_link;
        break;
      case "merakiWeb":
        link = group?.web_link ?? linksData?.web_link;
        break;
      case "c4ca":
        link = group?.c4ca_link ?? linksData?.c4ca_link;
        break;
      default:
        break;
    }

    if (link) {
      navigator.clipboard.writeText(link);
      showToast("success", "Link copied to the clipboard");
    }
    if (!link) {
      showToast("error", "No link found for this platform");
    }
  };

  return (
    <>
      {addStudentsOpen && (
        <AddStudentsModal
          boolean={addStudentsOpen}
          onToggle={handleAddStudentsOpen}
        />
      )}
      <Box
        sx={{
          backgroundColor: "#FAFAFA",
          width: "100%",
          height: "calc(100vh - 80px)",
          paddingLeft: "20px",
          overflowY: "scroll",
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
            <Button
              onClick={() => handleLinkCopy("merakiApp")}
              endIcon={<Link />}
              sx={{ fontSize: "14px" }}
            >
              Meraki App
            </Button>
            <Button
              onClick={() => handleLinkCopy("merakiWeb")}
              endIcon={<Link />}
              sx={{ fontSize: "14px" }}
            >
              Meraki Web
            </Button>
            <Button
              onClick={() => handleLinkCopy("c4ca")}
              endIcon={<Link />}
              sx={{ fontSize: "14px" }}
            >
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
      </Box>
    </>
  );
}

export default GroupPage;
