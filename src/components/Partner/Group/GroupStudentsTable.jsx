import { Box } from "@mui/material";
import GroupStudentsFilter from "./GroupStudentsFilter";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditStudentModal from "../EditStudentModal";
import { useDeleteStudentMutation } from "../../../store";
import showToast from "../../showToast";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Noto Sans !important",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "none",
            fontFamily: "Noto Sans !important",
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
            fontFamily: "Noto Sans !important",
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
  viewColumns: false,
  selectableRows: "none",
};

let btnsContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
};

function GroupStudentsTable({ handleAddStudentsOpen, data, student }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const opena = Boolean(anchorEl);

  const [deleteStudent, results] = useDeleteStudentMutation();

  useEffect(() => {
    if (results.isSuccess) {
      showToast("success", results?.data.message);
    }
  }, [results.isSuccess]);

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
      name: "enrolled_in",
      label: "Enrolled In",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",

        customBodyRender: (value) => {
          return (
            <>
              {value.map((item, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "22px !important",
                    padding: "3px 8px",
                    marginRight: "10px",
                    backgroundColor: "#E0E0E0",
                    borderRadius: "16px",
                  }}
                >
                  {item}
                </span>
              ))}
            </>
          );
        },
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
          const studentId = data[tableMeta.rowIndex].id;

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
                onClick={() => {
                  deleteStudent(studentId);
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
