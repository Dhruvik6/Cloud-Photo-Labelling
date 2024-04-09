import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Signup</h2>
            <p className="welcomeText">Welcome to Photo Labelling System</p>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Email *"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Password *"
                required
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Name *"
                required
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="mobile"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Mobile *"
                required
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>
            <button type="submit" className="btn btn-block">
              Signup
            </button>

            <div className="createAccount">
              <NavLink to="/" className="link">
                Already have an Account?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
