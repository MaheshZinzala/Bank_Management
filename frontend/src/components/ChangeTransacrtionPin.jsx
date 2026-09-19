import React, { useState } from "react";
import { Button, message } from "antd";

function ChangeTransactionPin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Change Transaction PIN
        </h1>

        <form className="space-y-4">
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
              name="oldPin"
              placeholder="Enter current PIN"
              maxLength={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm tracking-widest focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
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
              name="newPin"
              placeholder="Enter new PIN"
              maxLength={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm tracking-widest focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
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
