import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchOutlined } from "@mui/icons-material";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  TableCell,
} from "@mui/material";
import Box from "@mui/material/Box";
// import { useSelector } from "react-redux";
// import { useFetchBatchsQuery } from "../../store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBym, changeSearchTermm } from "../../store";
import { useNavigate } from "react-router-dom";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "NatoSans !important", // Apply NatoSans font to the whole table
          },
        },
      },

      MuiDataTableHeadCell: {
        styleOverrides: {
          root: {
            display: "block !important ",
            fontSize: "14px !important",
            fontFamily: "NatoSans !important", // Apply NatoSans font to the whole table
          },
        },
      },
      MuiDataTableToolbar: {
        styleOverrides: {
          root: {
            display: "block !important ",
            // fontFamily: "NatoSans !important", // Apply NatoSans font to the whole table
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "8px",
            // color:"red",
            backgroundColor: "none",
            fontFamily: "Noto Sans !important",
            textAlign: "left",
            "&.custom-cell": {
              width: "200px",
            },
          },
          head: {
            fontWeight: "bolder",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            height: "60px",
            "&:hover": {
              backgroundColor: "rgba(233, 245, 233, 1) !important",
              cursor: "pointer",
              // border: "1px solid red !important",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          regular: {
            minHeight: "8px",
          },
        },
      },
    },
  });

const options = {
  filterType: "checkbox",
  search: false,
  download: true,
  print: false,
  rowsHover: true,
  searchTextVariant: "outlined",
  selectableRows: "none",
  viewColumns: false,
};

const StudentList = ({ data }) => {
  // if (!data.length) {
  //   return <div>No students found</div>;
  // }

  const columns = [
    {
      name: "name",
      label: "Student Name",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
        customBodyRender: (value, tableMeta) => {
          return value;
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "lastName",
      label: "Latest Attended Class",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "state",
      label: "Progress",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const progressValue = Math.round(
            tableMeta.tableData[0].completed_percent
          );
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                variant="determinate"
                size={25}
                value={progressValue}
                style={{ color: "green", marginRight: "8px" }}
              />
              <span style={{ fontSize: "14px" }}>{`${progressValue}%`}</span>
            </div>
          );
        },
      },
    },
    {
      name: "state",
      label: "Attendance",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const { spaceId, groupId, partnerId, batchId } = useParams();

  const dispatch = useDispatch();
  const { searchTerm, filterBy } = useSelector((state) => {
    return state.studentFilter;
  });

  const filterTerms = [
    "All Partners",
    "Newly Onboarded",
    "Active",
    "Inactive",
    "Archived",
  ];

  const handleChange = (e) => {
    dispatch(changeSearchTermm(e.target.value));
  };
  const Navigate = useNavigate();
  const handleRowClick = (rowData, rowMeta) => {
    const studentId = data[rowMeta.rowIndex].id;
    Navigate(
      `/partner/${partnerId}/space/${spaceId}/group/${groupId}/batch/${batchId}/studentinfo/${studentId}`
    );
  };

  return (
    <div style={{ border: "0px solid red" }}>
      <Box style={{ margin: "0px 10px 0px 5px" }}>
        <TextField
          placeholder="Search Student..."
          value={searchTerm}
          onChange={handleChange}
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ color: "#2E2E2E" }} />
              </InputAdornment>
            ),
            style: {
              height: "48px",
            },
            inputProps: {
              style: {
                fontSize: "14px",
              },
            },
          }}
          sx={{ width: "360px" }}
        />
      </Box>

      <ThemeProvider theme={getMuiTheme}>
        <MUIDataTable
          data={data}
          columns={columns}
          options={{ ...options, onRowClick: handleRowClick }}
        />
      </ThemeProvider>
    </div>
  );
};

export default StudentList;
