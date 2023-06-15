import React from "react";
import { Box, Typography } from "@mui/material";
import studentImage from "./assests/bg.png";
import emailLogo from "./assests/Vector (1).png";
import phoneIcon from "./assests/phoneIcon.png";
import Accordion from "./Accordian/Accordion";

import CircularProgress from "@mui/material/CircularProgress";

const StudentInfo = () => {
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Box
        style={{
          fontSize: "14px",
          // display:"block",
          // width:"100%",
          // border: "1px solid blue",
        }}
      >
        Ahaan Bengaluru / Student Group 1 / Python / Anand NG
      </Box>
      <Box
        style={{
          //   border: "1px solid blue",
          margin: "20px auto",
          width: "584px",
        }}
      >
        <Box
          style={{
            padding: "10px",
            // border: "1px solid blue",
          }}
        >
          <Box
            style={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              //   border: "1px solid blue",
              marginBottom: "5px",
            }}
          >
            <img
              src={studentImage}
              alt="studentImage"
              style={{ marginRight: "10px" }}
            />
            <Typography
              style={{
                fontSize: "18px",
                weight: "600",
                // border: "1px solid blue",
              }}
            >
              Anand NG
            </Typography>
            <Box
              style={{
                // border: "1px solid red",
                display: "flex",
                position: "relative",
                left: "200px",
              }}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "18px",
                    marginRight: "35px",
                  }}
                >
                  Progress
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <img
              src={emailLogo}
              alt="emailLogo"
              style={{ marginRight: "10px", height: "16px", width: "20px" }}
            />
            <Typography
              style={{
                fontSize: "14px",
                display: "inline",
              }}
            >
              anand@gmail.com
            </Typography>
          </Box>
          <Box>
            <img
              src={phoneIcon}
              alt="phoneIcon"
              style={{ marginRight: "10px", height: "16px", width: "20px" }}
            />
            <Typography
              style={{
                fontSize: "14px",
                display: "inline",
              }}
            >
              +91 9898989898
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          style={{
            fontSize: "18px",
            weight:"600", 
            width:"584px",
            margin:"0px auto",
          }}
        >
          Course Wise Performance
        </Typography>
      </Box>
      <Accordion />
      <Accordion />
      <Accordion />
    </Box>
  );
};

export default StudentInfo;
