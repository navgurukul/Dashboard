import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import HomeHeader from "../../components/Header/HomeHeader";
import { ToastContainer } from "react-toastify";
import { Link, Outlet } from "react-router-dom";
import DashboardImage from "./assets/dashboard.png";
import EasyIcon from "./assets/easy.svg";
import AttendanceIcon from "./assets/attendence.svg";
import StudentsIcon from "./assets/students.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "./assets/dicto.jpg";
import Infosys from "./assets/infosys.png";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import WorldImage from "./assets/world_icon.svg";


function HomePage() {
  const [user, setUser] = useState({});
  const [partner, setPartner] = useState([]);
  const [showMore, setShowMore] = useState(false); // Define and initialize showMore state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://navgurukul.github.io/tarabai-shinde/data/meraki_partners.json"
      )
      .then((response) => {
        setPartner(response.data);
      });
  }, []);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = JSON.parse(localStorage.getItem("token"));
    if (userData) {
      axios({
        url: `https://merd-api.merakilearn.org/users/auth/GoogleIdentityServices`,
        method: "post",
        headers: { accept: "application/json", Authorization: token },
        data: { idToken: token, mode: "web" },
      }).then((res) => {
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        dispatch(setToken(res.data.token));
        navigate("/partner");
      });
    }
  }, [user]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <ToastContainer limit={1} />
      {/* Header without profile icon */}
      <HomeHeader />
      <Outlet />
      {/* First section with access dashboard button */}
      <Container>
        <Grid
          container
          style={{ display: "flex", justifyContent: "center" }}
          sx={{
            pt: 20,
            pb: 10,
            // px: 15,
          }}
        >
          <Grid item md={6} sm={12}>
            <Typography variant="h4">
              Give your students a step in <br /> the door with Meraki
            </Typography>
            <Typography variant="body2">
              Track your students learning seamlessly all in one place
            </Typography>
            <br />
            <a href="https://accounts.navgurukul.org">
              <Button
                // startIcon={<Add />}
                // onClick={handleModalToggle}
                style={{ marginTop: 20 }}
                variant="contained"
              >
                <Typography variant="subtitle2">
                  Access Partner Dashboard
                </Typography>
              </Button>
            </a>
            <br />
            <br />
            {/* <Box style={{ display: "flex", gap: 2 }}>
            <Typography variant="body2">New to Meraki?</Typography>
            <Typography variant="body2">
              <a href="#" style={{ color: "#48A145", fontWeight: "bold" }}>
                Register as a Partner
              </a>
            </Typography>
          </Box> */}
          </Grid>

          <Grid item md={6} sm={12}>
            <img src={DashboardImage} height={370} width={550} />
          </Grid>
        </Grid>
      </Container>
      {/* Solution section */}
      <Box>
        <Typography align="center" variant="h5">
          One Stop Solution for All Your Needs
        </Typography>
        <Box gap={5} display={"flex"} justifyContent="center" my={3}>
          <Card sx={{ maxWidth: 400, padding: 3, backgroundColor: "#D3EAFD" }}>
            <CardActionArea>
              <CardContent>
                <img src={EasyIcon} />
                <Typography
                  pt={3}
                  gutterBottom
                  variant="subtitle2"
                  fontSize={17}
                >
                  Easy Organizational Structure
                </Typography>
                <Typography fontSize={18} variant="body2">
                  We cover all scenarios whether
                </Typography>
                <ul style={{ padding: 20 }}>
                  <li>
                    <Typography fontSize={18} variant="body2">
                      You need one study batch for your students
                    </Typography>
                  </li>
                  <li>
                    <Typography fontSize={18} variant="body2">
                      You need multiple study batches for your students
                    </Typography>
                  </li>
                  <li>
                    <Typography fontSize={18} variant="body2">
                      You have multiple branches in the same city or different
                      cities
                    </Typography>
                  </li>
                </ul>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              maxWidth: 400,
              height: 300,
              padding: 3,
              backgroundColor: "#FFF5CC",
            }}
          >
            <CardActionArea>
              <CardContent>
                <img src={StudentsIcon} />
                <Typography
                  pt={3}
                  gutterBottom
                  variant="subtitle2"
                  fontSize={17}
                >
                  Student Learning{" "}
                </Typography>
                <Typography fontSize={18} variant="body2">
                  Effectively monitor enrollment of your students in our program
                  and track their learning progress{" "}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              maxWidth: 400,
              height: 320,
              padding: 3,
              backgroundColor: "#FFE5E3",
            }}
          >
            <CardActionArea>
              <CardContent>
                <img src={AttendanceIcon} />
                <Typography
                  pt={3}
                  gutterBottom
                  variant="subtitle2"
                  fontSize={17}
                >
                  Track Attendance{" "}
                </Typography>
                <Typography fontSize={18} variant="body2">
                  With our attendance recording facility, you can rectify your
                  students problems who are unable to attend the classes{" "}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
      {/* Partners section */}
      <Box px={15}>
        <Typography align="center" pt={5} variant="h5">
          One Partners
        </Typography>
        <Typography
          gutterBottom
          align="center"
          variant="subtitle1"
          fontSize={17}
          mb={5}
          pt={1}
        >
          30+ Partners have trusted Meraki with their students learning{" "}
        </Typography>

        <Container maxWidth={false}>
          <Grid
            style={{ backgroundColor: "#F5F5F5" }}
            container
            columnSpacing={{ xs: 2, sm: 4 }}
            paddingY={8}
          >
            <img src={Image} style={{ marginLeft: 20 }} />
            <Grid item xs={10} sm={6} md={6}>
              <Chip
                label="Featured"
                color="warning"
                sx={{ mt: 2, fontFamily: "Noto sans" }}
              />
              <Typography variant="h6" mt={2}>
                Amazon Future Engineer
              </Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                Amazon Future Engineer is a complete package of
                childhood-to-career program aimed at increasing access to
                computer science education for children and young adults from
                underserved and underrepresented communities. Amazon has
                partnered with Meraki to further our cause.
              </Typography>
              <Stack sx={{ alignItems: "start" }}>
                <Button ml={6} href={"#"}>
                  Learn More <ArrowForwardIosIcon />{" "}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Partner list section */}
      <Container sx={{ mt: 8, p: 0 }}>
        
        <Grid container spacing={6} pb={4}>
          {(showMore
            ? Object.keys(partner)
            : Object.keys(partner).slice(0, 8)
          ).map((item) => {
            return (
              <Grid key={partner[item].Name} item xs={12} sm={3} md={3}>
                {partner[item].Name !== null &&
                  partner[item].OrganisationType !== null &&
                  !partner[item].State !== null &&
                  !partner[item].City !== null && (
                    <Card
                      elevation={2}
                      sx={{
                        height: 210,
                      }}
                    >
                      <CardContent sx={{ height: "140px" }}>
                        <Typography variant="subtitle1" gutterBottom mb={1}>
                          {partner[item].Name}
                        </Typography>
                        {partner[item].OrganisationType === "Non - Profit" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="caption"
                            sx={{
                              background: "#FFF3CD",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : partner[item].OrganisationType === "Government" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="caption"
                            sx={{
                              background: "#DADAEC",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : partner[item].OrganisationType ===
                          "Educational Institution" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="contained"
                            sx={{
                              background: "#D3EAFD",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : partner[item].OrganisationType ===
                          "Community based organisation" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="contained"
                            sx={{
                              background: "#FFE6E8",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </CardContent>
                      <CardActions sx={{ height: "8px", marginTop: 3 }}>
                        {partner[item].Url !== "NA" &&
                          partner[item].Url !== null && (
                            <IconButton>
                              <Link href={partner[item].Url} target="_blank">
                                <img
                                  src={WorldImage}
                                  style={{ margin: "auto" }}
                                  alt="World Img"
                                />
                              </Link>
                            </IconButton>
                          )}
                      </CardActions>
                    </Card>
                  )}
              </Grid>
            );
          })}
        </Grid>
        
        {Object.keys(partner).length>0? (
          <Stack pt={3} sx={{ alignItems: "center" }}>
            {!showMore ? (
              <Button onClick={() => setShowMore(true)} ml={6}>
                Show More <KeyboardArrowDownIcon />
              </Button>
            ) : (
              <Button onClick={() => setShowMore(false)} ml={6}>
                Show Less <KeyboardArrowUpIcon />
              </Button>
            )}
          </Stack>
        ):<></>}
      </Container>

      {/* Footer with list of all partners. */}
      <Footer />
    </Box>
  );
}

export default HomePage;
