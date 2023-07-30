import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import HomeHeader from "../../components/Header/HomeHeader";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import DashboardImage from "./assets/dashboard.png";
import EasyIcon from "./assets/easy.svg";
import AttendanceIcon from "./assets/attendence.svg";
import StudentsIcon from "./assets/students.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "./assets/dicto.jpg";
import Infosys from "./assets/infosys.png";
import Footer from "../../components/Footer/Footer";

function HomePage() {
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
      <Box
        style={{ display: "flex" }}
        sx={{
          pt: 20,
          pb: 10,
          px: 15,
        }}
      >
        <Box>
          <Typography variant="h4">
            Give your students a step in <br /> the door with Meraki
          </Typography>
          <Typography variant="body2">
            Track your students learning seamlessly all in one place
          </Typography>
          <br />
          <Button
          href="/partner"
            // startIcon={<Add />}
            // onClick={handleModalToggle}
            style={{ marginTop: 20 }}
            variant="contained"
          >
            <Typography variant="subtitle2">
              Access Partner Dashboard
            </Typography>
          </Button>
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
        </Box>

        <Box style={{ marginLeft: "auto" }}>
          <img src={DashboardImage} height={370} width={550} />
        </Box>
      </Box>
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
            md={12}
            container
            columnSpacing={{ xs: 2, sm: 4 }}
            paddingY={8}
          >
            <img src={Image} style={{ marginLeft: 20 }} />
            <Grid item xs={10} sm={6} md={6} spacing={6}>
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
      <Box px={25} pt={10}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(12)).map((num, index) => (
            <Grid xs={2} py={3} key={num}>
              <img src={Infosys} width={125} />
            </Grid>
          ))}
        </Grid>
        <Stack pt={3} sx={{ alignItems: "center" }}>
          <Button ml={6} href={"#"}>
            Show More <KeyboardArrowDownIcon />
          </Button>
        </Stack>
      </Box>
      {/* Footer with list of all partners. */}
      <Footer />
    </Box>
  );
}

export default HomePage;
