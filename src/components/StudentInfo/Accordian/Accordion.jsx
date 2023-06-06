import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleAccordion() {
  return (
    <div
      style={{
        width: "584px",
        margin: "20px auto",
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Course 1: Introduction to Python</Typography>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                variant="determinate"
                size={25}
                value={74}
                style={{ color: "green", marginRight: "8px" }}
              />
              <span style={{ fontSize: "14px" }}>{`${44}%`}</span>
            </div>
          </Box>
          <Box>
            <Typography 
            style={{
              fontSize: "14px",
              fontColor:"red !important",
            }}
            >
              Classes
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
