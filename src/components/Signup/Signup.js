import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../../utils/validationSchema";
import { CreateUser, SendOTP } from "../../apis/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64, // Adjust the value as needed
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    padding: 20,
    width: "100%",
    maxWidth: 400,
    borderColor: "#000",
  },
  form: {
    width: "100%",
    marginTop: 16, // Adjust the value as needed
  },
}));

const Signup = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (data) => {
      const response = await CreateUser(data);
      if (response?.data?.isRegistered) {
        const requestBody = {
          mobileNo: data.mobile,
        };
        const sendOTPResponse = await SendOTP(requestBody);
        if (sendOTPResponse?.data?.isSuccess) {
          localStorage.setItem("otp", sendOTPResponse?.data?.otp);
          toast.success(sendOTPResponse?.data?.message);
          navigate("/verify");
        } else {
          toast.error("Error occurred in registration.");
        }
      } else {
        toast.error("Error occurred in registration.");
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Signup
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Welcome to Photo Labelling System
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  id="mobile"
                  name="mobile"
                  label="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Signup
                </Button>
                <Typography variant="body2" align="center">
                  Already have an Account?{" "}
                  <Link href="/" color="primary">
                    Sign In
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Container>
  );
};

export default Signup;
