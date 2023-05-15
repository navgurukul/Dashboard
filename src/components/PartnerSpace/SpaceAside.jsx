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
import SpaceList from "./SpaceList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchSinglePartnerQuery } from "../../store";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function SpaceAside(value) {
  const { partnerId } = useParams();
  const { data, isLoading, error } = useFetchSinglePartnerQuery(partnerId);
  const { createSpaceOpen, handleCreateSpaceToggle } = value.value;
  const [partner, setPartner] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (data) {
      let [partnerData] = data;
      setPartner(partnerData);
    }
  }, [data]);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        sx={{
          width: 272,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            bgcolor: "#FAFAFA",
            width: 272,
            boxSizing: "border-box",
            position: "relative",
            border: "none",
            height: "calc(max-content - 80px)",
            // border: "1px solid red"
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {partner && (
          <>
            <Typography sx={{ m: 3 }}>{partner.name}</Typography>
            <Typography variant="subtitle2" sx={{ ml: 6 }}>
              Spaces
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              sx={{ m: 2 }}
              onClick={handleCreateSpaceToggle}
            >
              <Typography variant="subtitle2">New Spaces</Typography>
            </Button>
            <SpaceList partner={partner} />
          </>
        )}
      </Drawer>
    </>
  );
}

export default SpaceAside;
