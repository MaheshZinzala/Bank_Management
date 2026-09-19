import React, { useState } from "react";
import { Button, message } from "antd";

function Withdrawal() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Withdraw Money
        </h1>

        <form className="space-y-4">
          {/* Withdrawal Amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                $
              </span>
              <input
                type="text"
                inputMode="decimal"
                id="amount"
                name="amount"
                placeholder="0.00"
                className="w-full rounded-md border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Transaction PIN */}
          <div>
            <label
              htmlFor="transactionPin"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Transaction PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              id="transactionPin"
              name="transactionPin"
              placeholder="Enter transaction PIN"
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
            Withdraw Now
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Withdrawal;
