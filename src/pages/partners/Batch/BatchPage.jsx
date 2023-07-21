import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import spaceShipImage from "../../../components/Partner/assets/student_illustration.svg";
import { Link, Outlet, useParams } from "react-router-dom";
import pythonlogo from "./assests/courseicon.png";
import calenderIcon from "./assests/reshot-icon-calendar-FEQDJ2T9NL 1.png";
import teacherImage from "./assests/reshot-icon-teacher-3ADUGQCW6P (1) 1.png";
import { useState, useEffect } from "react";
import {
  useFetchSinglePartnerQuery,
  useFetchSingleGroupQuery,
  useFetchSingleSpaceQuery,
  useFetchBatchesQuery,
} from "../../../store";

const ImageSize = {
  width: "32px",
  height: "32px",
};

const ImageSizeCal = {
  width: "25px",
  height: "25px",
};

const BatchPage = () => {
  const { partnerId, spaceId, groupId, batchId } = useParams();

  const { data, isLoading, error } = useFetchBatchesQuery(groupId);

  const {
    data: partnerData,
    isLoading: partnerIsLoading,
    error: partnerError,
  } = useFetchSinglePartnerQuery(partnerId);

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
  const partner = partnerData?.name;
  const groupg = groupData?.[0];

  // let batchName;
  // let content;
  // if (isLoading) {
  //   content = null
  // } else {
  //   let iteration = data.map((batch)=>{
  //     if(batch.recurring_id == batchId){
  //       batchName = batch.title
  //     }
  //   })
  //    const spaces = spaceData?.data?.[0];
  //   content = (
  //     <Typography pl={0.5} variant="body2">
  //         {batchName}
  //     </Typography>
  //   );
  // }
  // console.log(partnerData);
  // console.log(groupData);

  const [activeElement, setActiveElement] = useState("students");

  useEffect(() => {
    setActiveElement("students");
  }, []);

  const handleClick = (element) => {
    setActiveElement(element);
  };

  return (
    <Box
      style={{
        width: "100%",
        padding: "0px 20px",
        overflowY: "scroll",
        height: "620px",
        // border:"3px solid green",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
        <Typography pr={0.5} variant="body2">
          {space?.space_name} /
        </Typography>
        <Typography variant="body2" color="primary.main">
           {groupg?.group_name} / 
        </Typography>
        <Typography variant="body2">  batch_name</Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <img src={pythonlogo} alt="pythonImage" style={ImageSize} />
          <Typography
            variant="subtitle2"
            style={{ fontSize: "18px", margin: "0px 10px", fontWeight: "bold" }}
          >
            Python Batch 1
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              marginLeft: "10px",
              padding: "5px 11px",
              borderRadius: "50px",
              backgroundColor: "#F7D060",
              fontWeight: "400",
            }}
          >
            Ongoing
          </Typography>
        </Box>
        <Box
          style={{
            // border: "1px solid green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // border: "1px solid green",
              marginRight: "40px",
            }}
          >
            <img src={calenderIcon} alt="" style={ImageSizeCal} />
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              16 Oct 23 to 20 Nov 23
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: "25px",
            }}
          >
            <img src={teacherImage} alt="" style={ImageSize} />
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              Prajakta Kishori
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          // border: "1px solid green",
          marginTop: "15px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to={`/partner/${partnerId}/space/${spaceId}/group/${groupId}/batch/${batchId}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            style={{
              borderBottom:
                activeElement === "students" ? "2px solid green" : "none",
              fontSize: "14px",
              fontWeight: "600",
              padding: "10px 30px",
              color: activeElement === "students" ? "green" : "black",
              cursor: "pointer",
            }}
            onClick={() => handleClick("students")}
          >
            Students
          </Typography>
        </Link>
        <Link
          to={`/partner/${partnerId}/space/${spaceId}/group/${groupId}/batch/${batchId}/attendancelist`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            style={{
              borderBottom:
                activeElement === "attendance" ? "2px solid green" : "none",
              fontSize: "14px",
              fontWeight: "600",
              padding: "10px 30px",
              color: activeElement === "attendance" ? "green" : "black",
              cursor: "pointer",
            }}
            onClick={() => handleClick("attendance")}
          >
            Attendance Data
          </Typography>
        </Link>
      </Box>
      <hr style={{ borderTop: "1px solid #BDBDBD", marginBottom: "10px" }} />
      <Outlet />
    </Box>
  );
};

export default BatchPage;
