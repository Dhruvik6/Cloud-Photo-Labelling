import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
import { 
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
} from "@mui/material";
import "./Signup.css";
import { CreateUser, SendOTP } from "../../apis/apis";

const Signup = () => {
  const navigate = useNavigate();
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
          toast.error("Error occured in registration.");
        }
      } else {
        toast.error("Error occured in registration.");
      }
    },
  });

  const styles = {
    container: {
      marginTop: 50,
    },
    cardContent: {
      padding: 30,
    },
    welcomeText: {
      marginTop: 10,
      marginBottom: 20,
    },
    inputField: {
      marginBottom: 20,
    },
    submitButton: {
      marginTop: 20,
    },
    createAccount: {
      marginTop: 20,
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
    },
  };

  return (
    <Container maxWidth="md" style={styles.container}>
      <Card variant="outlined">
        <CardContent style={styles.cardContent}>
          <Typography variant="h4" align="center">Signup</Typography>
          <Typography variant="body1" align="center" style={styles.welcomeText}>Welcome to Photo Labelling System</Typography>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <TextField
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Email"
              variant="outlined"
              fullWidth
              style={styles.inputField}
              required
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Password"
              variant="outlined"
              fullWidth
              style={styles.inputField}
              required
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Name"
              variant="outlined"
              fullWidth
              style={styles.inputField}
              required
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              type="tel"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Mobile"
              variant="outlined"
              fullWidth
              style={styles.inputField}
              required
              error={formik.touched.mobile && !!formik.errors.mobile}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={styles.submitButton}
            >
              Signup
            </Button>
            <div style={styles.createAccount}>
              <Link to="/" component={NavLink} style={styles.link}>
                Already have an Account?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
