import { Box } from "@mui/material";
import GroupStudentsFilter from "./GroupStudentsFilter";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditStudentModal from "../EditStudentModal";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "none",
            fontFamily: "NatoSans, sans-serif",
            textAlign: "left",
            "&.custom-cell": {
              width: "0px",
            },
          },
          head: {
            fontWeight: "bolder",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            backgroundColor: "#FAFAFA",
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FAFAFA",
            fontWeight: 600,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(233, 245, 233, 1) !important",
              cursor: "pointer",
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            cursor: "pointer",
          },
        },
      },
    },
  });

const options = {
  filterType: "checkbox",
  download: true,
  print: false,
  search: false,
  filter: false,
  rowFilter: false,
  selectableRows: "none",
};

let btnsContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
};

function GroupStudentsTable({ handleAddStudentsOpen, data, student }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const opena = Boolean(anchorEl);

  const [openUpdateStudent, setOpenUpdateStudent] = useState(false);
  const handleOpenUpdateStudentToggle = () => {
    setOpenUpdateStudent(!openUpdateStudent);
  };

  const handleEditClick = () => {
    handleOpenUpdateStudentToggle();
    setAnchorEl(null);
  };
  const columns = [
    {
      name: "name",
      label: "Student Name",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "enrolled",
      label: "Enrolled In",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customCellClass: "custom-cell",
        style: {
          color: "red",
        },
        customBodyRender: (_, tableMeta) => {
          // const partnerId = data[tableMeta.rowIndex].id;
          // const partneredit = data[tableMeta.rowIndex];

          return (
            <div style={btnsContainerStyles}>
              <Button
                size="small"
                // onClick={handleEditClick}
                sx={{
                  // height: "18px",
                  // width: "18px",
                  color: "#BDBDBD",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <EditIcon />
              </Button>
              <Button
                size="small"
                sx={{
                  // height: "18px",
                  // width: "18px",
                  color: "#BDBDBD",
                  "&:hover": { color: "error.main" },
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  // useEffect(() => {
  //   if (results.isSuccess) {
  //     showToast("success", results.data.status);
  //   }
  // }, [results.isSuccess]);

  // const handleDeleteClick = (partnerId) => {
  //   removePartner(partnerId);
  // };

  // const handleEditClick = (partnerId) => {
  //   setOpen(!open);
  //   setUpdateData(partnerId);
  // };

  return (
    <>
      {openUpdateStudent && (
        <EditStudentModal
          student={student}
          boolean={openUpdateStudent}
          onToggle={handleOpenUpdateStudentToggle}
        />
      )}
      <Box pr="20px" mt="15px">
        <GroupStudentsFilter handleAddStudentsOpen={handleAddStudentsOpen} />
        <Box sx={{ overflowX: "auto" }}>
          <ThemeProvider theme={getMuiTheme}>
            <MUIDataTable data={data} columns={columns} options={options} />
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
}

export default GroupStudentsTable;
