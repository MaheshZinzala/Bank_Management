import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/dashboard", {
          withCredentials: true,
        });
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-gray-600 font-semibold text-lg">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-red-500 font-semibold text-lg">
          {error || "No data available."}
        </div>
      </div>
    );
  }

  // Destructure values from response
  const { account, totalBalance, totalTransaction } = dashboardData;
  const transactions = Array.isArray(totalTransaction) ? totalTransaction : [];

  const totalDeposit = transactions
    .filter((tx) => tx.transaction_type === "deposit")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const totalWithdrawal = transactions
    .filter((tx) => tx.transaction_type === "withdrawal")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // Helper function to format account number as **** **** 1234
  const formatAccountNo = (accNo) => {
    if (!accNo) return "****";
    return `**** **** ${accNo.slice(-4)}`;
  };

  return (
    <div className="min-h-screen mt-15 bg-slate-100">
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 mt-1">
            Manage your account and transactions
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm uppercase tracking-wider">
                {account?.account_type
                  ? `${account.account_type} Account`
                  : "Available Balance"}
              </p>
              <h1 className="text-4xl font-bold mt-2">
                ₹{Number(totalBalance || 0).toLocaleString("en-IN")}
              </h1>
            </div>
            <span className="bg-blue-500/40 text-blue-100 text-xs px-3 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
              Active
            </span>
          </div>

          <p className="text-blue-100 mt-6 text-sm font-mono tracking-widest">
            Account No: {formatAccountNo(account?.account_no)}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Total Deposit */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
            <p className="text-gray-500 text-sm font-medium">Total Deposit</p>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              ₹{totalDeposit.toLocaleString("en-IN")}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Overall calculated</p>
          </div>

          {/* Total Withdrawal */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
            <p className="text-gray-500 text-sm font-medium">
              Total Withdrawal
            </p>
            <h2 className="text-2xl font-bold text-red-500 mt-2">
              ₹{totalWithdrawal.toLocaleString("en-IN")}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Overall calculated</p>
          </div>

          {/* Total Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
            <p className="text-gray-500 text-sm font-medium">
              Total Transactions
            </p>
            <h2 className="text-2xl font-bold text-blue-600 mt-2">
              {transactions.length}
            </h2>
            <p className="text-xs text-gray-400 mt-1">All time</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-100">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/transactions"
              className="border border-slate-200 rounded-xl p-4 text-center hover:bg-blue-50 hover:border-blue-500 transition-all duration-200 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                💰
              </div>
              <p className="font-semibold text-gray-700 text-sm">Transaction</p>
            </Link>

            <Link
              to="/passbook"
              className="border border-slate-200 rounded-xl p-4 text-center hover:bg-green-50 hover:border-green-500 transition-all duration-200 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                📒
              </div>
              <p className="font-semibold text-gray-700 text-sm">Passbook</p>
            </Link>

            <Link
              to="/changePassword"
              className="border border-slate-200 rounded-xl p-4 text-center hover:bg-yellow-50 hover:border-yellow-500 transition-all duration-200 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                🔐
              </div>
              <p className="font-semibold text-gray-700 text-sm">
                Change Password
              </p>
            </Link>

            <Link
              to="/changepin"
              className="border border-slate-200 rounded-xl p-4 text-center hover:bg-purple-50 hover:border-purple-500 transition-all duration-200 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                🔑
              </div>
              <p className="font-semibold text-gray-700 text-sm">Change PIN</p>
            </Link>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Transactions
            </h2>

            <Link
              to="/passbook"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No recent transactions found.
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 text-sm font-semibold text-gray-500">
                      Description
                    </th>
                    <th className="py-3 text-sm font-semibold text-gray-500">
                      Type
                    </th>
                    <th className="py-3 text-sm font-semibold text-gray-500">
                      Date
                    </th>
                    <th className="py-3 text-sm font-semibold text-gray-500 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentTransactions.map((item, index) => {
                    const isDeposit = item.transaction_type === "deposit";
                    return (
                      <tr
                        key={item._id || index}
                        className="border-b hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 font-medium text-gray-800 text-sm">
                          {item.description ||
                            item.remark ||
                            (isDeposit ? "Deposit" : "Withdrawal")}
                        </td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDeposit
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isDeposit ? "Deposit" : "Withdrawal"}
                          </span>
                        </td>

                        <td className="text-gray-500 text-sm">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </td>

                        <td
                          className={`text-right font-semibold text-sm ${
                            isDeposit ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isDeposit ? "+" : "-"} ₹
                          {Number(item.amount || 0).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
