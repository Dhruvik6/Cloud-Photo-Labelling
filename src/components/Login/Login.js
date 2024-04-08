import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";

import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Container,
  Card,
  CardContent,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import "./Login.css";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64, // Adjust the value as needed
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: 16, // Adjust the value as needed
  },
  submit: {
    marginTop: 24, // Adjust the value as needed
    marginBottom: 16, // Adjust the value as needed
  },
  card: {
    padding: 20,
    width: "100%",
    maxWidth: 400,
    borderColor: "#000",
  },
}));

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (data) => {
      setIsLoading(true);
      const isLoggedIn = await auth.login(data);
      if (isLoggedIn) {
        setIsLoading(false);
        navigate("/home");
        toast.success("Login Successful");
      } else {
        toast.error("Incorrect username or password.");
        setIsLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Welcome to Photo Labelling System
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={formik.isSubmitting} // Disable button while submitting
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <NavLink to="/signup">Don't have an Account? Sign Up</NavLink>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
