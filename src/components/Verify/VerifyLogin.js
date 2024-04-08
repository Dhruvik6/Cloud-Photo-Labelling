import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
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
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Verify Mobile</h2>
            <p className="welcomeText">
              We will never share your details with anyone
            </p>
            <div className="form-group">
              <input
                type="text"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="OTP *"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-block"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyLogin;
