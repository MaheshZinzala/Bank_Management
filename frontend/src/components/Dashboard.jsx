import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen mt-15 bg-slate-100">
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

          <p className="text-gray-500 mt-1">
            Manage your account and transactions
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg mb-6">
          <p className="text-blue-100">Available Balance</p>

          <h1 className="text-4xl font-bold mt-2">₹50,000</h1>

          <p className="text-blue-100 mt-3">Account No: **** **** 1234</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Deposit */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total Deposit</p>

            <h2 className="text-2xl font-bold text-green-600 mt-2">₹75,000</h2>

            <p className="text-sm text-gray-400 mt-1">This month</p>
          </div>

          {/* Withdrawal */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total Withdrawal</p>

            <h2 className="text-2xl font-bold text-red-500 mt-2">₹25,000</h2>

            <p className="text-sm text-gray-400 mt-1">This month</p>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total Transactions</p>

            <h2 className="text-2xl font-bold text-blue-600 mt-2">24</h2>

            <p className="text-sm text-gray-400 mt-1">This month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/transactions"
              className="border rounded-xl p-4 text-center hover:bg-blue-50 hover:border-blue-500"
            >
              <div className="text-3xl mb-2">💰</div>

              <p className="font-semibold text-gray-700">Transaction</p>
            </Link>

            <Link
              to="/passbook"
              className="border rounded-xl p-4 text-center hover:bg-green-50 hover:border-green-500"
            >
              <div className="text-3xl mb-2">📒</div>

              <p className="font-semibold text-gray-700">Passbook</p>
            </Link>

            <Link
              to="/changepassword"
              className="border rounded-xl p-4 text-center hover:bg-yellow-50 hover:border-yellow-500"
            >
              <div className="text-3xl mb-2">🔐</div>

              <p className="font-semibold text-gray-700">Change Password</p>
            </Link>

            <Link
              to="/changepin"
              className="border rounded-xl p-4 text-center hover:bg-purple-50 hover:border-purple-500"
            >
              <div className="text-3xl mb-2">🔑</div>

              <p className="font-semibold text-gray-700">Change PIN</p>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Transactions
            </h2>

            <Link to="/passbook" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 text-gray-500">Description</th>

                  <th className="py-3 text-gray-500">Type</th>

                  <th className="py-3 text-gray-500">Date</th>

                  <th className="py-3 text-gray-500 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4">ATM Deposit</td>

                  <td>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Deposit
                    </span>
                  </td>

                  <td className="text-gray-500">05 Oct 2026</td>

                  <td className="text-right font-semibold text-green-600">
                    + ₹10,000
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">Online Shopping</td>

                  <td>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                      Withdrawal
                    </span>
                  </td>

                  <td className="text-gray-500">04 Oct 2026</td>

                  <td className="text-right font-semibold text-red-600">
                    - ₹2,500
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Salary</td>

                  <td>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Deposit
                    </span>
                  </td>

                  <td className="text-gray-500">01 Oct 2026</td>

                  <td className="text-right font-semibold text-green-600">
                    + ₹30,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
