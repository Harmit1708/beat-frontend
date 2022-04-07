import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
function Login() {
  let navigate = useNavigate();



  let handleSubmit = async (values) => {
    let res = await axios.post("https://bwm0.herokuapp.com/users/login", values);

    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("firstname", res.data.firstname);
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short")
        .required("No Password Provided"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="log">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h3>Login Here</h3>

        <label for="email">Email Id</label>
        <input type="text" placeholder="Email" id="email" onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            >
            </input>{formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            >
            </input>
            {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}

        <button className="loginbtn">Log In</button>

        <div style={{ marginTop: "20px" }}>
          <span>Don't Have an account?</span>
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{ color: "white", cursor: "pointer" }}
          >
            &nbsp;Signup
          </span>
        </div>
        <span>Demo Credentials</span><br></br>
            <span className="text-light">Email:user@gmail.com</span><br></br>
            <spanp className="text-light">Password:user@123</spanp>
      </form>
    </div>
  );
}

export default Login;
