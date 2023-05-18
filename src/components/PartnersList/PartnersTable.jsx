import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  Typography,
  Pagination,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";

import { useRemovePartnerMutation } from "../../store";
import PartnerUpdateModal from "./PartnerUpdateModal";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import showToast from "../showToast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // fontSize: 14,
  backgroundColor: "white",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
  },
}));

// Define the colors for status
const circleColors = {
  Active: "#48A145",
  Inactive: "#FFCC00",
  "Newly Onboarded": "#2196F3",
  Archived: "#F44336",
};

// Styled component for the color of status
const Circle = styled("div")(({ color }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: color,
  display: "inline-block",
  marginRight: "5px",
 
}));

const typographyStyles1 = {
  color: "black",
  textDecoration: "none",
  width: "283.5px",
  height: "21px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "150%",
};

const typographyStyles2 = {
  color: "rgba(109, 109, 109, 1)",
  textDecoration: "none",
  width: "283.5px",
  height: "21px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "150%",
};

const typographyStyles3 = {
  color: "black",
  textDecoration: "none",
  width: "16px",
  height: "21px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "150%",
};

const typographyStyles4 = {
  color: "black",
  textDecoration: "none",
  fontSize: "14px",
 
  
};

function PartnersTable({ data }) {
  const [removePartner, results] = useRemovePartnerMutation();
  console.log(results);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const partnersPerPage = 10;
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = data.slice(indexOfFirstPartner, indexOfLastPartner);
  const [pageNumbers, setPageNumbers] = useState(Math.ceil(data.length));
  // const pageNumbers = Math.ceil(data.length / partnersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (rowData) => {
    setOpen(!open);
    setUpdateData(rowData);
  };

  const handleEmailClick = (rowData) => {
    //
  };

  const handleDeleteClick = (rowData) => {
    removePartner(rowData);
  };

  useEffect(() => {
    if (results.isSuccess) {
      showToast("success", results.data.status);
    }
  }, [results.isSuccess]);

  const Actions = ({ rowData }) => (
    <StyledTableCell>
      <Button
        onClick={() => handleEditClick(rowData)}
        sx={{ height:"18px", width:"18px", color: "#BDBDBD", "&:hover": { color: "info.main" } }}
      >
        <EditIcon>Edit</EditIcon>
      </Button>
      <Button
        onClick={() => {
          handleEmailClick(rowData);
        }}
        sx={{ height:"18px", width:"18px", color: "#BDBDBD", "&:hover": { color: "primary.main" } }}
      >
        <EmailIcon>Email</EmailIcon>
      </Button>
      <Button sx={{ height:"18px", width:"18px", color: "#BDBDBD", "&:hover": { color: "error.main" } }}>
        <DeleteIcon onClick={() => handleDeleteClick(rowData)}>
          Delete
        </DeleteIcon>
      </Button>
    </StyledTableCell>
  );

  const renderedData = currentPartners.map((row) => (
    <StyledTableRow key={row.id} sx={{ border: "none"}}>
      <StyledTableCell>
        <Link to={`partnerspace/${row.id}`} style={{ textDecoration: "none" }}>
          <Typography sx={typographyStyles1}>{row.name}</Typography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: "14px" }}>
          {row.point_of_contact_name || "---"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography sx={typographyStyles3}>{row.user || "---"}</Typography>
      </StyledTableCell>

      <StyledTableCell sx={{display: "flex", alignItems:"center"}}>
        {row.status && (
          <>
            <Circle color={circleColors[row.status]} />
            <Typography sx={typographyStyles4}>{row.status}</Typography>
          </>
        )}
        {!row.status && <Typography sx={typographyStyles4}>---</Typography>}
      </StyledTableCell>

      <Actions rowData={row} />
    </StyledTableRow>
  ));

  return (
    <>
      {open && (
        <PartnerUpdateModal
          boolean={open}
          onOpen={handleEditClick}
          partner={updateData}
        />
      )}
      <Box>
        <TableContainer sx={{overflow:"hidden"}}>
          <Table>
            <TableHead>
              <StyledTableRow sx={{ borderBottom: 2, borderColor: "#BDBDBD" }}>
                <StyledTableCell>
                  <Typography variant="subtitle2">Name</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2">Point of Contact</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2">
                    Number of Students
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2">Status</Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>{renderedData}</TableBody>
          </Table>
        </TableContainer>
        <Box
          mt={2}
          display="flex"
          sx={{ p: 2, gap: 22, color: "rgba(109, 109, 109, 1)" }}
        >
          <Typography sx={typographyStyles2}>
            Showing {currentPage * partnersPerPage - (partnersPerPage - 1)} -{" "}
            {currentPage * partnersPerPage} of {data.length} partners{" "}
          </Typography>

          <Pagination
            count={Math.ceil(data.length/10)}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            // defaultPage={3}
            // siblingCount={0}
            // boundaryCount={1}
          />
        </Box>
      </Box>
    </>
  );
}

export default PartnersTable;
