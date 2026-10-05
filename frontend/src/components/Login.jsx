import { Button } from "antd";
import axios from "axios";
import { Formik, Form, Field, useFormik } from "formik";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/v1/user/login", values);
        toast.success(response.data.message, {
          position: "top-center",
          style: {
            width: "80vh",
          },
        });
        resetForm();
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          style: {
            width: "80vh",
          },
        });
        console.log(error.response.data.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    axios
      .post("/api/v1/user/refresh-token", {})
      .catch((err) => console.log("User is not logged in"));
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="mt-2"
          >
            Login
          </Button>
          <ToastContainer />
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-500 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
