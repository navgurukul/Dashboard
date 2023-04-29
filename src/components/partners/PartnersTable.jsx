import { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Button,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { deletePartner } from "../../store";
import PartnerUpdateModal from "./PartnerUpdateModal";

import { styled } from "@mui/material";

// const StyledTable = styled(Table)

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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 10;
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = data.slice(indexOfFirstPartner, indexOfLastPartner);
  const pageNumbers = Math.ceil(data.length / partnersPerPage);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const nextPage = () => setCurrentPage(currentPage + 1);

  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleEditClick = (rowData) => {
    setOpen(!open);
    setUpdateData(rowData);
    //
  };

  const handleDeleteClick = (rowData) => {
    dispatch(deletePartner({ token, object: rowData }));
  };

  const handleEmailClick = (rowData) => {
    //
  };

  const Actions = ({ rowData }) => (
    <StyledTableCell>
      <Button sx={{ color: "#BDBDBD", "&:hover": { color: "info.main" } }}>
        <EditIcon onClick={() => handleEditClick(rowData)}>Edit</EditIcon>
      </Button>
      <Button sx={{ color: "#BDBDBD", "&:hover": { color: "primary.main" } }}>
        <EmailIcon
          onClick={() => {
            handleEmailClick(rowData);
          }}
        >
          Email
        </EmailIcon>
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
        <Typography>{row.name}</Typography>
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
                {/* <StyledTableCell><Typography variant="subtitle2">Actions</Typography></StyledTableCell> */}
              </StyledTableRow>
            </TableHead>
            <TableBody>{renderedData}</TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          {/* <Button disabled={currentPage === 1} onClick={prevPage} sx={{ mr: 1 }}>
          <KeyboardArrowLeftIcon />
        </Button>
        <Button>{currentPage}</Button>
        <Button
          disabled={currentPage === pageNumbers}
          onClick={nextPage}
          variant="contained"
        >
          <KeyboardArrowRightIcon />
        </Button> */}
          <Pagination count={3} color="primary" />
        </Box>
      </Box>
    </>
  );
}

export default PartnersTable;
