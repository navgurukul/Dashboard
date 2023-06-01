import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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

      MuiInputBase: {
        styleOverrides: {
          root: {
            display: "block !important ",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "8px",
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
      MuiDataTableSearchmain: {
        styleOverrides: {
          root: {
            display: "block !important ", // Apply NatoSans font to the whole table
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            display: "block !important ", // Apply NatoSans font to the whole table
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "8px",
            backgroundColor: "none",
            fontFamily: "NatoSans",
            textAlign: "left",
            "&.custom-cell": {
              width: "200px", // Set a fixed width for the cell using a custom CSS class
            },
          },
          head: {
            fontWeight: "bolder", // Set font weight to 600 for table header cells
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
            },
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

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: false,
      sort: false,
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
    name: "firstentrytime",
    label: "First Entry Time",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "lastentrytime",
    label: "Last Exit Time",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "duration",
    label: "Duration (mins)",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const data = [
  {
    name: "Joe James",
    email: "aa@gmail.com",
    firstentrytime: "Test Corp",
    lastentrytime: "Yonkers",
    duration: "NY",
    status: "Absent",
  },
  {
    name: "John Walsh",
    email: "aa@gmail.com",
    firstentrytime: "Test Corp",
    lastentrytime: "Hartford",
    duration: "CT",
    status: "Absent",
  },
  {
    name: "Bob Herm",
    email: "aa@gmail.com",
    firstentrytime: "Test Corp",
    lastentrytime: "Tampa",
    duration: "FL",
    status: "Absent",
  },
  {
    name: "James Houston",
    email: "aa@gmail.com",
    firstentrytime: "Test Corp",
    lastentrytime: "Dallas",
    duration: "FL",
    status: "Absent",
  },
];

const options = {
  filterType: "checkbox",
  search: true,
  download: true,
  print: false,
  rowsHover: true,
  searchTextVariant: "outlined",
  selectableRows: false,
  searchProps: {
    style: {
      display: "block !important",
      border: "2px solid grey", // Custom border style for the search bar
      borderRadius: "8px", // Custom border radius for the search bar
      padding: "8px", // Custom padding for the search bar
    },
  },
};

const AttandanceList = () => {
  const { spaceId, groupId } = useParams();

  return (
    <div style={{ paddingTop: "1px", overflowX: "auto" }}>
      <ThemeProvider theme={getMuiTheme}>
        <MUIDataTable
          title={"Employee List"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
};

export default AttandanceList;
