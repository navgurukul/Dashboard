import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import MultipleSelect from "../Batch/MultipleSelect";
import Box from "@mui/material/Box";
import calenderIcon from "../../pages/./partners/Batch/assests/reshot-icon-calendar-FEQDJ2T9NL 1.png";
import { TextField, Button, Typography, InputAdornment } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBya, changeSearchTerma } from "../../store";

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
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "none",
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

const options = {
  filterType: "checkbox",
  search: false,
  download: true,
  print: false,
  rowsHover: true,
  searchTextVariant: "outlined",
  selectableRows: "none",
  searchProps: {
    style: {
      display: "block !important",
      border: "2px solid grey", // Custom border style for the search bar
      borderRadius: "8px", // Custom border radius for the search bar
      padding: "8px", // Custom padding for the search bar
    },
  },
};

const AttandanceList = ({ data }) => {
  const columns = [
    {
      name: "firstName",
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
      name: "salary",
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

  const filterTerms = ["All Students", "Absent", "Present"];

  const dispatch = useDispatch();
  const { searchTerm, filterBy } = useSelector((state) => {
    return state.attendanceFilter;
  });

  const handleChange = (e) => {
    dispatch(changeSearchTerma(e.target.value));
  };

  const filterButtons = filterTerms.map((term) => (
    <Button
      onClick={() => dispatch(changeFilterBya(term))}
      key={term}
      variant={term === filterBy ? "contained" : "outlined"}
      sx={{
        mr: 1,
        borderRadius: "50px",
        borderColor: "#DCDCDC",
        padding: "8px 8px",
        height: "40px",
        margin: "0px 10px",
      }}
    >
      <Typography variant="body2" color={term !== filterBy && "text.primary"}>
        {term}
      </Typography>
    </Button>
  ));

  const { spaceId, groupId } = useParams();

  return (
    <div style={{ paddingTop: "1px", overflowX: "auto" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // border: "1px solid green",
          paddingRight: "30px",
        }}
      >
        <MultipleSelect style={{ height: "10px !important" }} />

        <Box
          style={{
            display: "flex",
          }}
        >
          <img src={calenderIcon} alt="" style={{ height: "22px" }} />
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            16 Oct 23
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box style={{ margin: "10px 10px 10px 5px" }}>
          <TextField
            placeholder="Search Student..."
            size="medium"
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: "#2E2E2E" }} />
                </InputAdornment>
              ),
              style: {
                height: "48px",
              },
            }}
            sx={{ width: "360px" }}
          />
        </Box>
      </Box>
      {filterButtons}
      <ThemeProvider theme={getMuiTheme}>
        <MUIDataTable data={data} columns={columns} options={options} />
      </ThemeProvider>
    </div>
  );
};

export default AttandanceList;
