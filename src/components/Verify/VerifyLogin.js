import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { 
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./VerifyLogin.css";
import { VerifyOTP } from "../../apis/apis";

const VerifyLogin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (data) => {
      const requestData = {
        otp: data.otp,
        verifyOTP: localStorage.getItem("otp"),
      };
      const response = await VerifyOTP(requestData);
      if (response?.data?.isVerified) {
        localStorage.removeItem("otp");
        navigate("/");
        toast.success(response?.data?.message);
      } else {
        toast.success(response?.data?.message);
      }
    },
  });

  const styles = {
    container: {
      marginTop: 50,
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
  };

  return (
    <Container maxWidth="md" style={styles.container}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Typography variant="h4" align="center">Verify Mobile</Typography>
            <Typography variant="body1" align="center" style={styles.welcomeText}>
              We will never share your details with anyone
            </Typography>
            <div className="form-group">
              <TextField
                type="text"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="OTP"
                variant="outlined"
                fullWidth
                style={styles.inputField}
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={styles.submitButton}
            >
              Verify OTP
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default VerifyLogin;
