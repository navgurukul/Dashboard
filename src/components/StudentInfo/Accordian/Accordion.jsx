import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import greenTick from "../assests/greenTick.png";

const spanQuestionElement = {
  display: "inline-block",
  width: "12px",
  height: "12px",
  borderRadius: "4px",
  marginRight: "5px",
};

const spanColors = {
  totalQuestions: "#48A145",
  attemptedQuestions: "#2E2E2E",
  correctAnswers: "#2196F3",
  wrongAnswers: "#48A145",
};

export default function SimpleAccordion() {
  return (
    <div
      style={{
        width: "584px",
        margin: "20px auto",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 2px 1px rgba(0, 0, 0, 0.04), 0px 1px 5px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Course 1: Introduction to Python</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              left: "180px",
            }}
          >
            <CircularProgress
              variant="determinate"
              size={25}
              value={74}
              style={{ color: "green", marginRight: "8px" }}
            />
            <span style={{ fontSize: "14px" }}>{`${68}%`}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                style={{
                  fontSize: "14px",
                  weight: "600",
                  // border: "1px solid blue",
                }}
              >
                Course 1: Introduction to Python
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              // border: "1px solid red",
              margin: "20px 0px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                color: "#6D6D6D",
              }}
            >
              Classes
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                // border: "1px solid red",
              }}
            >
              <img src={greenTick} alt="greenTick" />
              <Typography
                style={{
                  fontSize: "14px",
                  marginLeft: "5px",
                }}
              >
                Attended all 2 classes in the course
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography
                style={{
                  fontSize: "14px",
                  marginBottom: "15px",
                  color: "#6D6D6D",
                }}
              >
                Assessments (MCQs)
              </Typography>
            </Box>
            <Box style={{ display: "flex" }}>
              <Box style={{ marginRight: "20px" }}>
                <Typography style={{ fontSize: "14px" }}>
                  Total Questions
                </Typography>
                <span
                  style={{
                    ...spanQuestionElement,
                    backgroundColor: spanColors.totalQuestions,
                  }}
                ></span>
                20
              </Box>
              <Box style={{ marginRight: "20px" }}>
                <Typography style={{ fontSize: "14px" }}>
                  Attempted Questions
                </Typography>
                <span
                  style={{
                    ...spanQuestionElement,
                    backgroundColor: spanColors.attemptedQuestions,
                  }}
                ></span>
                20
              </Box>
              <Box style={{ marginRight: "20px" }}>
                <Typography style={{ fontSize: "14px" }}>
                  Correct Answers
                </Typography>
                <span
                  style={{
                    ...spanQuestionElement,
                    backgroundColor: spanColors.correctAnswers,
                  }}
                ></span>
                20
              </Box>
              <Box style={{ marginRight: "20px" }}>
                <Typography style={{ fontSize: "14px" }}>
                  Wrong Answers
                </Typography>
                <span
                  style={{
                    ...spanQuestionElement,
                    backgroundColor: spanColors.wrongAnswers,
                  }}
                ></span>
                20
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
