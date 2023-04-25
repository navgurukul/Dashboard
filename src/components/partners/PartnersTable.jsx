import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { deletePartner } from "../../store";

function PartnersTable({ data }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 10;
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = data.slice(indexOfFirstPartner, indexOfLastPartner);
  const pageNumbers = Math.ceil(data.length / partnersPerPage);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const nextPage = () => setCurrentPage(currentPage + 1);

  const handleEditClick = (rowData) => {
    //
  };

  const handleDeleteClick = (rowData) => {
    dispatch(deletePartner({ token, object: rowData }));
  };

  const handleEmailClick = (rowData) => {
    //
  };

  const Actions = ({ rowData }) => (
    <TableCell>
      <EditIcon onClick={() => handleEditClick(rowData)}>Edit</EditIcon>
      <EmailIcon
        onClick={() => {
          handleEmailClick(rowData);
        }}
      >
        Delete
      </EmailIcon>
      <DeleteIcon onClick={() => handleDeleteClick(rowData)}>Delete</DeleteIcon>
    </TableCell>
  );

  const renderedData = currentPartners.map((row) => (
    <TableRow key={row.id} sx={{ border: "none" }}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.point_of_contact_name || "---"}</TableCell>
      <TableCell>{row.user || "---"}</TableCell>
      <TableCell>{row.status || "---"}</TableCell>
      <Actions rowData={row} />
    </TableRow>
  ));

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow sx={{ borderBottom: 2 }}>
            <TableCell>Name</TableCell>
            <TableCell>Point of Contact</TableCell>
            <TableCell>Number of Students</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderedData}</TableBody>
      </Table>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button disabled={currentPage === 1} onClick={prevPage} sx={{ mr: 1 }}>
          <KeyboardArrowLeftIcon />
        </Button>
        <Button>{currentPage}</Button>
        <Button
          disabled={currentPage === pageNumbers}
          onClick={nextPage}
          variant="contained"
        >
          <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default PartnersTable;
