import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import SpaceList from "../Space/SpaceList";
import { Link, useParams } from "react-router-dom";
import { useFetchSinglePartnerQuery } from "../../../store";
import { Add } from "@mui/icons-material";
import SidebarContext from "./sidebarContext";

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
  const {
    data: partner,
    isLoading,
    error,
  } = useFetchSinglePartnerQuery(partnerId);
  const { handleCreateSpaceToggle, handleCreateBatchToggle } = value.value;

  return (
    <>
      <SidebarContext.Provider
        value={{ handleCreateSpaceToggle, handleCreateBatchToggle }}
      >
        <Drawer
          sx={{
            width: 272,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 272,
              boxSizing: "border-box",
              position: "relative",
              border: "none",
              overflowX: "hidden",
              overflowY: "scroll",
              maxHeight: "calc(100vh - 80px)",
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
              <SpaceList partner={partner} />
            </>
          )}
        </Drawer>
      </SidebarContext.Provider>
    </>
  );
}

export default Sidebar;
