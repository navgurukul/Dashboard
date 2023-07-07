import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import SpaceList from "../Space/SpaceList";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchSinglePartnerQuery } from "../../../store";
import { Add } from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function Sidebar(value) {
  const { partnerId } = useParams();
  const { data, isLoading, error } = useFetchSinglePartnerQuery(partnerId);
  const {
    createSpaceOpen,
    handleCreateSpaceToggle,
    handleCreateGroupToggle,
    handleCreateBatchToggle,
  } = value.value;
  const [partner, setPartner] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (data) {
      let [partnerData] = data;
      setPartner(partnerData);
    }
  }, [data]);

  return (
    <>
      <Drawer
        sx={{
          width: 272,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            // bgcolor: "red",
            width: 272,
            boxSizing: "border-box",
            position: "relative",
            // border: "none",
            // display: "flex",
            // flexDirection: "column",
            overflowX: "hidden",
            overflowY: "auto",
            // height: "100%",
            height: "calc (100vh - 400px)",
            border: "2px solid yellow",
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <DrawerHeader>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              variant="span"
              component="span"
              fontFamily="Noto Sans"
              sx={{ fontSize: "14px" }}
              fontWeight="600"
              color="text.primary"
            >
              Back
            </Typography>
          </Link>
        </DrawerHeader>
        {partner && (
          <>
            <Typography
              sx={{ ml: 2, mb: 2, fontWeight: 600, fontSize: "18px" }}
            >
              {partner.name}
            </Typography>
            <Typography
              color="text.secondary"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginLeft: "16px",
              }}
            >
              Partner Spaces
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              sx={{ width: "240px", margin: "16px", height: "40px" }}
              onClick={handleCreateSpaceToggle}
              startIcon={<Add sx={{ height: "18px", width: "18px" }} />}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                New Space
              </Typography>
            </Button>
            <SpaceList
              partner={partner}
              handleCreateGroupToggle={handleCreateGroupToggle}
              handleCreateBatchToggle={handleCreateBatchToggle}
            />
          </>
        )}
      </Drawer>
    </>
  );
}

export default Sidebar;
