import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import SpaceList from "../Space/SpaceList";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchSinglePartnerQuery } from "../../../store";
import { Add } from "@mui/icons-material";
import SidebarContext from "./sidebarContext";
import infoIcon from "./assests/info.svg";
import Box from "@mui/material/Box";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function Sidebar(value) {
  const [showBox, setShowBox] = useState(true);

  const InfoIcon = () => {
    setShowBox(!showBox);
  };

  
  const { partnerId } = useParams();
  const { data, isLoading, error } = useFetchSinglePartnerQuery(partnerId);
  const { handleCreateSpaceToggle, handleCreateBatchToggle } = value.value;
  const [partner, setPartner] = useState(null);
  const theme = useTheme();
 console.log(data);
  useEffect(() => {
    if (data) {
      let [partnerData] = data;
      setPartner(partnerData);
    }
  }, [data]);

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
              <Box
                sx={{
                  display: "flex",
                }}
              >
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
               
                {showBox ?  <img
                  src={infoIcon}
                  alt={infoIcon}
                  style={{
                    marginLeft: "8px",
                    width: "24px",
                    transition: "opacity 0.3s",
                  }}
                  onClick={InfoIcon}
                /> : (
                  <Box
                    style={{
                      // border: "1px solid red",
                      marginLeft: "162px",
                      borderRadius: "8px",
                      position: "fixed",
                      padding:"32px",
                      left:"-900",
                      zIndex: "1000",
                      background:"#FFF",
                      width:"540px",
                      height:"max-content",
                      boxShadow:
                        "0px 8px 10px 0px rgba(0, 0, 0, 0.08), 0px 6px 30px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06)",
                    }}
                    onClick={InfoIcon}
                  >
                    <Typography variant="body2" style={{fontSize: "18px", fontWeight: "600", marginBottom:"16px"}} >
                      What are partner spaces?
                    </Typography> 
                    <Typography variant="body2" style={{fontSize: "14px", fontWeight: "400"}}  >
                      Partner spaces are the individual branches of the partner
                      which may be a school, NGO or any other organizational
                      branch in the same location or different locations. For
                      best practices, please give them an appropriate name like
                      ‘Partnername-Location” or similar.
                    </Typography>
                  </Box>
                )}
              </Box>
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
