import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import showToast from "../showToast";
import PartnerUpdateModal from "./PartnerUpdateModal";
import { Link } from "react-router-dom";
import { useRemovePartnerMutation } from "../../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            // padding: "8px",
            backgroundColor: "none",
            fontFamily: "NatoSans, sans-serif",
            textAlign: "left",
            "&.custom-cell": {
              width: "0px",
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
  download: true,
  print: false,
  search: false,
  filter: false,
  rowFilter: false,
  selectableRows: false
  // rowsHover: true, // Enable row hover effect
};
// Define CSS class for row hover effect
let btnsContainerStyles = {
  display: "flex",
  // position: "relative",
  // left: "-24px",
  // width: "170px",
  textAlign:"right",
  // border:"1px solid red"
};

function NewPartnerTable({ data }) {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
        customBodyRender: (value, tableMeta) => (
          <Link
            to={`/partner/${data[tableMeta.rowIndex].id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {value}
          </Link>
        ),
      },
    },
    {
      name: "point_of_contact_name",
      label: "Point of Contact",
      options: {
        filter: false,
        sort: false,
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
      name: "user",
      label: "Number of Students",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
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
          const partnerId = data[tableMeta.rowIndex].id;
          const partneredit = data[tableMeta.rowIndex];

          return (
            <div style={btnsContainerStyles}>
              <Button
                size="small"
                sx={{
                  height: "18px",
                  width: "18px",
                  color: "#BDBDBD",
                  paddingLeft:"50px",
                  "&:hover": { color: "primary.main" },
                }}
                onClick={() => handleEditClick(partneredit)}
              >
                <EditIcon />
              </Button>
              <Button
                size="small"
                sx={{
                  height: "18px",
                  width: "18px",
                  color: "#BDBDBD",
                  paddingLeft:"50px",
                  "&:hover": { color: "error.main" },
                }}
                onClick={() => handleDeleteClick(partneredit)}
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

  const [removePartner, results] = useRemovePartnerMutation();

  useEffect(() => {
    if (results.isSuccess) {
      showToast("success", results.data.status);
    }
  }, [results.isSuccess]);

  const handleDeleteClick = (partnerId) => {
    removePartner(partnerId);
  };

  const handleEditClick = (partnerId) => {
    setOpen(!open);
    setUpdateData(partnerId);
  };

  return (
    <>
      {open && (
        <PartnerUpdateModal
          boolean={open}
          onOpen={handleEditClick}
          partner={updateData}
        />
      )}

      <div style={{ overflowX: "auto" }}>
        <ThemeProvider theme={getMuiTheme}>
          <MUIDataTable
            title={"Partner's List"}
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default NewPartnerTable;