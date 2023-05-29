import MUIDataTable from "mui-datatables";
import { useSelector } from "react-redux";
import { useFetchPartnersQuery } from "../../store";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import showToast from "../showToast";
import PartnerUpdateModal from "./PartnerUpdateModal";
import { Link } from "react-router-dom";
import { useRemovePartnerMutation } from "../../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme with the desired styles
const getMuiTheme = createTheme({
  overrides: {
    MUIDataTableToolbar: {
      root: {
        boxShadow: "none", // Remove the shadow from the toolbar
      },
    },
  },
});

const options = {
  filterType: "checkbox",
  download: false,
  print: false,
  rowHover: true,
};

let tableStyles = {
  width: "1440px",
  height: "910px",
  backgroundColor: "none !important",
  boxShadow: "none",
};

let btnsContainerStyles = {
  display: "flex",
  alignItems: "center",
  MaxWidth: "200px",
};

const NewMuiTable = () => {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "point_of_contact_name",
      label: "Point of Contact",
      options: {
        filter: false,
        sort: true,
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
      name: "user",
      label: "Number of Students",
      options: {
        filter: false,
        sort: true,
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
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        style: {
          color: "red",
        },
        customBodyRender: (_, tableMeta) => {
          const partnerId = renderedData[tableMeta.rowIndex].id;

          const partneredit = renderedData[tableMeta.rowIndex];
          //  console.log(partnerId)
          // console.log(columns)
          return (
            <Container sx={btnsContainerStyles}>
              <Button
                size="small"
                sx={{
                  height: "18px",
                  width: "18px",
                  color: "#BDBDBD",
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
                  "&:hover": { color: "error.main" },
                }}
                onClick={() => handleDeleteClick(partneredit)}
              >
                <DeleteIcon />
              </Button>
              <Link
                to={`/partner/${partnerId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button size="small">View</Button>
              </Link>
            </Container>
          );
        },
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [removePartner, results] = useRemovePartnerMutation();
  const { data, isLoading, error } = useFetchPartnersQuery();
  const renderedData = data?.partners || [];

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

  // console.log(renderedData)

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
            title={"Partner List"}
            data={renderedData}
            columns={columns}
            options={options}
            // sx={tableStyles}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default NewMuiTable;
