import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  BankOutlined,
  RightOutlined,
} from "@ant-design/icons";
import axios from "axios";

function ManageAccount() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/user/manageAccount", { withCredentials: true })
      .then((res) => setAccountInfo(res.data))
      .catch((err) =>
        setError(
          err.response?.data?.message || "Unable to load account details",
        ),
      );
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Manage Account</h1>

          <p className="text-slate-500 mt-2">
            Manage your account and security settings
          </p>
        </div>

        {error ? (
          <p role="alert" className="mb-6 text-red-600">
            {error}
          </p>
        ) : !accountInfo ? (
          <p className="mb-6 text-slate-600">Loading account details...</p>
        ) : (
          <>
            {/* ================= ACCOUNT CARD ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              {/* Blue Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-7 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <UserOutlined className="text-2xl" />
                  </div>

                  <div>
                    <p className="text-blue-100 text-sm">Welcome back</p>

                    <h2 className="text-2xl font-bold">
                      {accountInfo?.user.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Account Number */}
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      Account Number
                    </p>

                    <p className="font-mono font-semibold text-slate-800 mt-2">
                      {accountInfo.account.account_no}
                    </p>
                  </div>

                  {/* Account Type */}
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      Account Type
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <BankOutlined className="text-blue-600" />

                      <p className="font-semibold text-slate-800">
                        {accountInfo.account.account_type}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      Email
                    </p>

                    <p className="font-semibold text-slate-800 mt-2">
                      {accountInfo.user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= SECURITY ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <SafetyCertificateOutlined className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Security Settings
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Keep your account secure
              </p>
            </div>
          </div>

          {/* ================= SECURITY OPTIONS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Change Password */}
            <Link
              to="/changepassword"
              className="group border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <LockOutlined className="text-xl" />
                </div>

                <RightOutlined className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>

              <h3 className="font-semibold text-slate-800 mt-5">
                Change Password
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Change your login password to keep your account secure.
              </p>

              <div className="mt-4 text-sm font-semibold text-blue-600">
                Change Password →
              </div>
            </Link>

            {/* Change PIN */}
            <Link
              to="/changepin"
              className="group border border-slate-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <KeyOutlined className="text-xl" />
                </div>

                <RightOutlined className="text-slate-300 group-hover:text-purple-600 transition-colors" />
              </div>

              <h3 className="font-semibold text-slate-800 mt-5">
                Change Transaction PIN
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Update your 4-digit PIN used for transactions.
              </p>

              <div className="mt-4 text-sm font-semibold text-purple-600">
                Change PIN →
              </div>
            </Link>
          </div>

          {/* ================= SECURITY NOTICE ================= */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <SafetyCertificateOutlined className="text-green-600 text-lg mt-0.5" />

            <div>
              <p className="text-sm font-semibold text-slate-700">
                Your account is secure
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Never share your password, transaction PIN, or OTP with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
