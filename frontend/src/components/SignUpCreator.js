import * as React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../constant/serverUrl";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Fundify © {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpCreator() {
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    // const imageFile = document.querySelector('#profileImage');
    // data.append('creatorProfileImage', imageFile.files[0]);

    const creatorPageName = data.get("pageName");

    axios
      .post(SERVER_URL + "/users/new", {
        userType: "creator",
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        pageName: data.get("pageName"),
        category: data.get("category"),
        description: data.get("description"),
      })
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("pageName", response.data.pageName);
      })
      .then(() => {
        let formData = new FormData();
        let imageFile = document.querySelector("#profileImage");
        formData.append("profileImage", imageFile.files[0]);
        axios
          .post(
            SERVER_URL + "/upload/creator/profile/image/" + creatorPageName,
            formData
          )
          .then((response) => {
            console.log(response);
            history.replace("/creatordashboard/projects");
          })
          .catch((error) => console.log(error));
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <IconButton
            aria-label="close"
            onClick={() => {
              history.push("/home/creators");
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up - Creator
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pageName"
                  required
                  fullWidth
                  id="pageName"
                  label="Page name"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name='profilePicture'
                  required
                  fullWidth
                  id='profilePicture'
                  label='Profile Picture'
                /> */}
                <label htmlFor="profileImage">Profile image:&ensp;</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept=".jpg"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "black" }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => history.push("/login")}
                  style={{ color: "black" }}
                  underline="hover"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
