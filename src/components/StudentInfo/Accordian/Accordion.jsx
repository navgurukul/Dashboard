import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import greenTick from "../assests/greenTick.png";
import redCross from "../assests/redCross.png";

const spanQuestionElement = {
  display: "inline-block",
  width: "12px",
  height: "12px",
  borderRadius: "4px",
  marginRight: "5px",
};

const spanColors = {
  totalQuestions: "#2E2E2E",
  attemptedQuestions: "#2196F3",
  correctAnswers: "#48A145",
  wrongAnswers: "red",
};

const SimpleAccordion = ({ courseInfo }) => {
  const { id, name, mcqs, courseProgressBar } = courseInfo;
  const isAllQuestionsAttempted =
    mcqs?.attemptedQuestions === mcqs?.totalQuestions;

  return (
    <div
      style={{
        width: "584px",
        margin: "20px auto",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 2px 1px rgba(0, 0, 0, 0.04), 0px 1px 5px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Accordion key={id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{name}</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft:"auto"

            }}
          >
            <CircularProgress
              variant="determinate"
              size={25}
              value={courseProgressBar}
              style={{ color: "green", marginRight: "5px" }}
            />
            <span style={{ fontSize: "14px" }}>
              {courseProgressBar?.toFixed(2)}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            style={{ display: "flex", justifyContent: "space-between" }}
            key="box1"
          >
            <Box>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              margin: "20px 0px",
            }}
            key="box2"
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
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {isAllQuestionsAttempted ? (
                  <img src={greenTick} alt="greenTick" />
                ) : (
                  <img
                    style={{ width: "12px", height: "12px" }}
                    src={redCross}
                    alt="redCross"
                  />
                )}
                <Typography style={{ fontSize: "14px", marginLeft: "5px" }}>
                  {isAllQuestionsAttempted
                    ? `Attended all ${mcqs?.totalQuestions} classes in the course`
                    : `Attended all ${mcqs?.totalQuestions} classes in the course`}
                </Typography>
              </div>
            </Box>
          </Box>
          <Box key="box3">
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
                {mcqs?.totalQuestions}
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
                {mcqs?.attemptedQuestions}
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
                {mcqs?.correctAnswers}
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
                {mcqs?.wrongAnswers}
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SimpleAccordion;
