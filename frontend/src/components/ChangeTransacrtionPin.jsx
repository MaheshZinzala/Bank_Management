import React, { useState } from "react";
import { Button, message } from "antd";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  transaction_pin: Yup.string()
    .matches(/^\d{4,6}$/, "Transaction PIN must be 4-6 digits")
    .required("Transaction PIN is required"),
  newTransaction_pin: Yup.string()
    .matches(/^\d{4,6}$/, "New Transaction PIN must be 4-6 digits")
    .required("New Transaction PIN is required"),
});

function ChangeTransactionPin() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      transaction_pin: "",
      newTransaction_pin: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Change Transaction PIN
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Current PIN */}
          <div>
            <label
              htmlFor="oldPin"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Current Transaction PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              id="oldPin"
              name="transaction_pin"
              placeholder="Enter current PIN"
              maxLength={6}
              value={values.transaction_pin}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm tracking-widest focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.transaction_pin && touched.transaction_pin && (
              <div className="text-red-500 text-sm mt-1">
                {errors.transaction_pin}
              </div>
            )}
          </div>

          {/* New PIN */}
          <div>
            <label
              htmlFor="newPin"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Transaction PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              id="newPin"
              name="newTransaction_pin"
              placeholder="Enter new PIN"
              maxLength={6}
              value={values.newTransaction_pin}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm tracking-widest focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.newTransaction_pin && touched.newTransaction_pin && (
              <div className="text-red-500 text-sm mt-1">
                {errors.newTransaction_pin}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="mt-2"
          >
            Update PIN
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangeTransactionPin;
