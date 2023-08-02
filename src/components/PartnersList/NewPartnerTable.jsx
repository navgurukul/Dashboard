import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import showToast from "../showToast";
import PartnerUpdateModal from "./PartnerUpdateModal";
import { useRemovePartnerMutation } from "../../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const getMuiTheme = () =>
  createTheme({
    components: {
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
  selectableRows: "none",
};

let btnsContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
};

function NewPartnerTable({ data }) {
  let partnerId = "";

  const columns = [
    {
      name: "name",
      label: "Student Name",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta) => {
          return value;
        },
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
          partnerId = data[tableMeta.rowIndex].id;
          const partneredit = data[tableMeta.rowIndex];
          return (
            <div style={btnsContainerStyles}>
              <Button
                size="small"
                sx={{
                  color: "#BDBDBD",
                  "&:hover": { color: "primary.main" },
                }}
                // onClick={() => handleEditClick(partneredit)}
                onClick={(event) => handleEditButtonClick(partneredit, event)}
              >
                <EditIcon />
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const Navigate = useNavigate();
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

  const handleEditButtonClick = (partneredit, event) => {
    event.stopPropagation(); // Stop the event propagation to prevent handleRowClick from being called
    handleEditClick(partneredit);
  };

  const handleRowClick = (event, dataIndex) => {
    partnerId = data[dataIndex.dataIndex].id;
    Navigate(`/partner/${partnerId}`);
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

      <div style={{ overflowX: "hidden" }}>
        <ThemeProvider theme={getMuiTheme}>
          <MUIDataTable
            title={
              <Typography variant="h6" style={{ fontFamily: "Noto Sans" }}>
                Partner's List
              </Typography>
            }
            data={data}
            columns={columns}
            options={{ ...options, onRowClick: handleRowClick }}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default NewPartnerTable;
