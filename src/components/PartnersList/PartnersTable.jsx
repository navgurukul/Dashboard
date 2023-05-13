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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // fontSize: 14,
  backgroundColor: "white",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "white",
  "& : hover": {
    backgroundColor: "white",
  },
}));

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
  const pageNumbers = Math.ceil(data.length / partnersPerPage);

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
      alert(results.data.status);
    }
  }, [results]);

  const Actions = ({ rowData }) => (
    <StyledTableCell>
      <Button
        onClick={() => handleEditClick(rowData)}
        sx={{ color: "#BDBDBD", "&:hover": { color: "info.main" } }}
      >
        <EditIcon>Edit</EditIcon>
      </Button>
      <Button
        onClick={() => {
          handleEmailClick(rowData);
        }}
        sx={{ color: "#BDBDBD", "&:hover": { color: "primary.main" } }}
      >
        <EmailIcon>Email</EmailIcon>
      </Button>
      <Button sx={{ color: "#BDBDBD", "&:hover": { color: "error.main" } }}>
        <DeleteIcon onClick={() => handleDeleteClick(rowData)}>
          Delete
        </DeleteIcon>
      </Button>
    </StyledTableCell>
  );

  const renderedData = currentPartners.map((row) => (
    <StyledTableRow key={row.id} sx={{ border: "none" }}>
      <StyledTableCell>
        <Link to={`partnerspace/${row.id}`} style={{ textDecoration: "none" }}>
          <Typography sx={{ color: "black", textDecoration: "none" }}>
            {row.name}
          </Typography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <Typography>{row.point_of_contact_name || "---"}</Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography>{row.user || "---"}</Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography>{row.status || "---"}</Typography>
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
        <TableContainer>
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
        <Box mt={2} display="flex"  sx={{p:2, gap: 22}}>
          <Typography
            
          >
            Showing {currentPage * 10 - 9} - {currentPage * 10} of {data.length}{" "}
            partners{" "}
          </Typography>

          <Pagination
            count={pageNumbers}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
}

export default PartnersTable;
