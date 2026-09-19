import React, { useState } from "react";
import { Button, message } from "antd";

function ChangePassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Change Password
        </h1>

        <form className="space-y-4">
          {/* Current Password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter current password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
