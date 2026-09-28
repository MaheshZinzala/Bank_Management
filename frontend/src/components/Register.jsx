import { Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  transaction_pin: Yup.string()
    .matches(/^\d{4,6}$/, "Transaction PIN must be 4-6 digits")
    .required("Transaction PIN is required"),
  account_type: Yup.string().required("Account Type is required"),
  gender: Yup.string().required("Gender is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  transaction_pin: "",
  account_type: "",
  gender: "",
  city: "",
  address: "",
};

function Register() {
  const navigation = useNavigate();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/v1/user/register", values);
        toast.success(response.data.message || "User Register successfully", {
          position: "top-center",
        });
        navigation("/");
      } catch (error) {
        toast.error(response.data.message || "User Register successfully", {
          position: "top-center",
        });
      }
    },
  });

  return (
    <div className="flex min-h-screen mt-12 items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email Address
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

          {/* Password & Transaction PIN Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                placeholder="Create password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="transactionPin"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Transaction PIN
              </label>
              <input
                type="password"
                id="transactionPin"
                name="transaction_pin"
                value={values.transaction_pin}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={6}
                placeholder="4-6 digit PIN"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.transaction_pin && touched.transaction_pin && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.transaction_pin}
                </div>
              )}
            </div>
          </div>

          {/* Account Type - Tailwind CSS Select */}
          <div>
            <label
              htmlFor="account_type"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Account Type
            </label>
            <select
              id="account_type"
              name="account_type"
              value={values.account_type}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select account type
              </option>
              <option value="saving">Savings Account</option>
              <option value="current">Current Account</option>
            </select>
            {errors.account_type && touched.account_type && (
              <div className="text-red-500 text-sm mt-1">
                {errors.account_type}
              </div>
            )}
          </div>

          {/* Gender & City Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Gender - Tailwind CSS Select */}
            <div>
              <label
                htmlFor="gender"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && touched.gender && (
                <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter city"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.city && touched.city && (
                <div className="text-red-500 text-sm mt-1">{errors.city}</div>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your address"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.address && touched.address && (
              <div className="text-red-500 text-sm mt-1">{errors.address}</div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isSubmitting}
            className="mt-2"
          >
            Register
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/"
            className="font-semibold text-blue-600 hover:text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
