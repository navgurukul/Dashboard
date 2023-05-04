import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { Button } from "@mui/material";
import { Outlet, useLocation, useParams } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button,Modal, TextField, } from "@mui/material";
import spaceShipImage from "./assets/student illustration.svg";
import { useState } from "react";
import LongMenu from "../../../components/PartnersList/LongMenu"
import InputBar from "../Batch"
import { Link } from "react-router-dom";
import MainContent from "./MainContent";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}; 

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PartnersCreationOfSpace() {
  const { id } = useParams();
  const location = useLocation();
  const partnerName = location.state; 
  const theme = useTheme();
  //x
  // const [open, setOpen] = useState(false);

  //x
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
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
        <Divider />
        <List>
          {[partnerName].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}      
        </List>
        {/* <Typography variant="subtitle1" sx={{ml:6}}>{partnerName}</Typography> */}
        <Typography variant="subtitle2" sx={{ml:6}}>Spaces</Typography>
        <Button
          variant="contained"
          color="inherit"
          sx={{ m: 2 }}
          onClick={handleDrawerOpen}
          
          // edge="start"
          // sx={{ mr: 2,marginLeft: "16px" , ...(open && { display: "none" }) }}
        >
          <Typography variant="subtitle2">New Spaces</Typography>
        </Button>
        <Typography sx={{fontSize:"14px", ml:2}} >Start out by creating the first space</Typography>
       <Link to={`batch`}>
       <Button
          variant="contained"
          sx={{ m: 2, }}
           
        >
          <Typography sx={{fontSize:"14px"}}>Ahaan Primary</Typography>
          <LongMenu  />
        </Button>
       </Link>
        <Divider />
      </Drawer>
      <Main open={open}>
     <Outlet/>
     </Main>
    </Box>
    
  );
}
