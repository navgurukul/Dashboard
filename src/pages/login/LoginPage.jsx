import styles from "./styles";
import GoogleSvg from "./assets/Google.svg";
import login from "./assets/login.svg";
import { Container, Grid, Typography, Stack, Button } from "@mui/material";

function LoginPage() {
  return (
    <Container
      // className={isActive ? classes.resMerakilogin : classes.merakiLogin}
      sx={styles.merakiLogin}
      maxWidth="lg"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} ms={6} md={6}>
          <Container maxWidth="md">
            <Typography
              sx={{ pt: { xs: "none", md: 24 } }}
              variant="h4"
              // align={isActive || isActiveIpad ? "center" : "left"}
              align="left"
              // mt={isActive ? 0 : isActiveIpad ? 12 : 0}
              color="textPrimary"
              gutterBottom
            >
              Embark on your learning journey with Meraki
            </Typography>

            {/* {loading ? (
              <Box
                className={
                  isActive || isActiveIpad
                    ? classes.responsiveLoder
                    : classes.Loder
                }
              >
                <Loader />
              </Box>
            ) : ( */}
            {/* <Stack alignItems={isActive || isActiveIpad ? "center" : "left"}> */}
            <Stack alignItems="left">
              <>
                <Button
                  variant="contained"
                  // startIcon={<GoogleIcon />}
                  startIcon={<img src={GoogleSvg} />}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    // width: isActive ? "100%" : "max-content",
                    width: "max-content",
                    margin: "10px 0",
                    fontSize: "18px",
                  }}
                >
                  Log In with Google
                </Button>
              </>
            </Stack>
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          ms={6}
          md={6}
          sx={{ mb: 5, display: { xs: "none", md: "flex" } }}
        >
          {/* <img src={require("./assets/login.svg")} alt="img" /> */}
          <img src={login} alt="img" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
{
  /* sx={`${styles.googleLogin}`} */
}
