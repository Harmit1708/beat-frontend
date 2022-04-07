import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    let res = await axios.post(
      "https://bwm0.herokuapp.com/users/signup",
      values
    );
    if (res.data.statusCode === 200) {
      navigate("/login");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .required("No Password Provided"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("No Password Provided"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="sign">
      <div className="background2">
        <div className="shape2"></div>
        <div className="shape2"></div>
      </div>
      <form className="form2" onSubmit={formik.handleSubmit} autocomplete="off">
        <h3>Signup Here</h3>

        <label for="firstname">First Name</label>
        <input type="text" placeholder="First Name" id="firstname" onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname}
          ></input>
          {formik.touched.firstname && formik.errors.firstname ? (
            <div style={{ color: "red"}}>
              {formik.errors.firstname}
            </div>
          ) : null}

        <label for="lastname">Last Name</label>
        <input type="text" placeholder="Last Name" id="lastname" onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname}
          ></input>
          {formik.touched.lastname && formik.errors.lastname ? (
            <div style={{ color: "red"}}>
              {formik.errors.lastname}
            </div>
          ) : null}

        <label for="email">Email Id</label>
        <input type="text" placeholder="Email" id="email"  onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red"}}>
              {formik.errors.email}
            </div>
          ) : null}

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          ></input>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red"}}>
              {formik.errors.password}
            </div>
          ) : null}

        <label for="cpassword">Confirm Password</label>
        <input type="password" placeholder="Confirm Password" id="cpassword" onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.cpassword}
          ></input>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <div style={{ color: "red"}}>
              {formik.errors.cpassword}
            </div>
          ) : null}

        <button className="loginbtn">Sign Up</button>
        <div style={{ marginTop: "20px" }}>
          <span>Already Have an account?</span>
          <span
            onClick={() => {
              navigate("/login");
            }}
            style={{ color: "white", cursor: "pointer" }}
          >
            &nbsp;Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
