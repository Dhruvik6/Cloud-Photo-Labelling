import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
import { 
  Container,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import "./Login.css";


const Login = () => {

 

  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
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

  const inputStyles = {
    marginBottom: "16px",
  };
  const formStyles = {
    padding: "16px",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "primary",
  };
  return (
    <Container maxWidth="md" className="container">
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4" align="center">Login</Typography>
        <Typography variant="body1" align="center" className="welcomeText">Welcome to Photo Labelling System</Typography>
        <form onSubmit={formik.handleSubmit} style={formStyles}>
          <TextField
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Email"
            variant="outlined"
            fullWidth
            style={inputStyles}
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
            style={inputStyles}
            required
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
         
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <div className="createAccount">
            <Link to="/signup" component={NavLink} style={linkStyles} className="link">
              Don't have an Account?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  </Container>
);
};

export default Login;
