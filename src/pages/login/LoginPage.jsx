/* global google */

import styles from "./styles";
import { useEffect, useState } from "react";
import GoogleSvg from "./assets/Google.svg";

import jwt_decode from 'jwt-decode';
import login from "./assets/login.svg";
import axios from "axios";
import { Container, Grid, Typography, Stack, Button } from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setToken } from "../../store/slices/authSlice";
function LoginPage() {

const dispatch = useDispatch()
const navigate =  useNavigate()
  const handleCallbackResponse = (response) => {
    console.log("encoded data JWT: " + response.credential);
    const decodedToken = response.credential;
    console.log(decodedToken)

    axios({
      url: `https://merd-api.merakilearn.org/users/auth/GoogleIdentityServices`,
      method: "post",
      headers: { accept: "application/json", Authorization: decodedToken },
      data: { idToken: decodedToken, mode: "web" }
    }).then((res) => {
      localStorage.setItem("AUTH", JSON.stringify(res.data));
      dispatch(setToken(res.data.token));
      navigate("/partner");
    });
  };


  useEffect(() => {


    google?.accounts.id.initialize({
      client_id: "734424141181-508773k06uc88bdc9h4jrbpsgfpdv1ph.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      width: 200, size: "large"
    });


  }, []);



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
            <Stack alignItems="left">
              <>
              <div id="signInDiv" className="custom-google-button" >Login with Google</div>
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
