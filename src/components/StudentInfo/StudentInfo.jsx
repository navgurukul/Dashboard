import React from "react";
import { Box, Typography } from "@mui/material";
import studentImage from "./assests/bg.png";
import emailLogo from "./assests/Vector (1).png";
import phoneIcon from "./assests/phoneIcon.png";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Accordion from "./Accordian/Accordion";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchStudentPerformanceQuery } from "../../store";
import { useFetchStudentInfoQuery } from "../../store";
import { useFetchPartnerNameQuery } from "../../store";
import { Link, useParams } from "react-router-dom";

const StudentInfo = () => {
  const { spaceId, groupId, partnerId, batchId, studentId } = useParams();
  const { data, isLoading, error } = useFetchStudentPerformanceQuery(studentId);
  const { currentData } = useFetchStudentInfoQuery(studentId);
  console.log("data", data);
  console.log("currentData", currentData);
  const profile_image = currentData?.user.profile_picture;
  const name_student = currentData?.user.name;
  const name_email = currentData?.user.email;
  const name_contact = currentData?.user.contact;
  const overallProgress = data?.overallProgress ?? 0;

  // Fetch partner name using the hook
  const {
    data: partnerData,
    isLoading: partnerLoading,
    error: partnerError,
  } = useFetchPartnerNameQuery(partnerId);
  const partnerName = partnerData?.[0]?.name ?? "";
  const currentSpace = partnerData?.[0]?.spaces_data.find(
    (space) => space.id === parseInt(spaceId)
  );
  const spaceName = currentSpace?.space_name ?? "Unknown Space";
  // Iterate through space_groups to find the relevant group object based on groupId
  const currentGroup =
    currentSpace?.space_groups.find(
      (group) => group.id === parseInt(groupId)
    ) || currentSpace?.space_groups[0];
  const groupName = currentGroup?.group_name ?? "Unknown Group";

  return (
    <>
      <Box
        style={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box>
          {partnerLoading ? (
            <p>Loading partner name...</p>
          ) : partnerError ? (
            <p>Error loading partner name</p>
          ) : (
            <Typography style={{ fontFamily: "Noto Sans", fontSize: "14px" }}>
              {partnerName} / {spaceName} / {groupName} / {name_student}
            </Typography>
          )}
        </Box>

        <Box
          style={{
            margin: "20px auto",
            width: "584px",
          }}
        >
          <Link
            to={`/partner/${partnerId}`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              variant="span"
              component="span"
              fontFamily="Noto Sans"
              sx={{ fontSize: "14px" }}
              fontWeight="600"
              color="text.primary"
            >
              Back
            </Typography>
          </Link>

          <Box
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={profile_image}
                alt="studentImage"
                style={{ width: "100px", marginRight: "10px" }}
              />
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {name_student}
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  marginRight: "20px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Track Progress
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress
                    variant="determinate"
                    size={25}
                    value={overallProgress}
                    style={{ color: "green", marginRight: "8px" }}
                  />
                  <span
                    style={{ fontSize: "14px" }}
                  >{`${overallProgress.toFixed(2)}%`}</span>
                </div>
              </Box>
              <Box>
                <Typography
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Attendance
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress
                    variant="determinate"
                    size={25}
                    value={68}
                    style={{ color: "green", marginRight: "8px" }}
                  />
                  <span style={{ fontSize: "14px" }}>{`${68}%`}</span>
                </div>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <img
                src={emailLogo}
                alt="emailLogo"
                style={{ height: "16px", width: "20px", marginRight: "10px" }}
              />
              <Typography
                style={{
                  fontSize: "14px",
                  display: "inline",
                }}
              >
                {name_email}
              </Typography>
            </Box>
            <Box>
              <img
                src={phoneIcon}
                alt="phoneIcon"
                style={{ height: "16px", width: "20px", marginRight: "10px" }}
              />
              <Typography
                style={{
                  fontSize: "14px",
                  display: "inline",
                }}
              >
                {name_contact}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography
            style={{
              fontSize: "18px",
              fontWeight: "600",
              width: "584px",
              margin: "0px auto",
            }}
          >
            Course Wise Performance
          </Typography>
        </Box>
        {data ? (
          data.Courses.map((course, index) => (
            <Accordion key={index} courseInfo={course} />
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </Box>
    </>
  );
};

export default StudentInfo;
