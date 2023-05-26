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

const options = {
  filterType: "checkbox",
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
        filter: true,
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
        customBodyRender: (_, tableMeta) => {
          const partnerId = renderedData[tableMeta.rowIndex].id;
          //  console.log(partnerId)
          // console.log(columns)
          return (
            <>
              <Button
                size="small"
                sx={{
                  height: "18px",
                  width: "18px",
                  color: "#BDBDBD",
                  "&:hover": { color: "primary.main" },
                }}
                onClick={() => handleEditClick(partnerId)}
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
                onClick={() => handleDeleteClick(partnerId)}
              >
                <DeleteIcon />
              </Button>
              <Link
                to={`/partner/${partnerId}`}
                style={{ textDecoration: "none", color: "black" }}
                 
              >
                <Button size="small">View</Button>
              </Link>
            </>
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
      <div style={{ margin: "0px auto" }}>
        <MUIDataTable
          title={"Partner List"}
          data={renderedData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default NewMuiTable;
