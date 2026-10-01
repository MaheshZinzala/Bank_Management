import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Transactions() {
  const [data, setData] = useState({
    transaction_type: "deposit",
    amount: "",
    transaction_pin: "",
    description: "",
  });
  const transactionTypeHandle = (value) => {
    setData({ ...data, transaction_type: value });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    if (data.transaction_type === "deposit") {
      try {
        const response = await axios.post("/api/v1/transaction/deposit", data);
        toast.success(response.data.message, {
          position: "top-center",
          style: {
            width: "80vh",
          },
        });
        setData({
          transaction_type: "deposit",
          amount: "",
          transaction_pin: "",
          description: "",
        });
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          style: {
            width: "80vh",
          },
        });
        console.log(error.response.data.message || "Something went wrong");
      }
    } else {
      try {
        const response = await axios.post(
          "/api/v1/transaction/withdrawal",
          data,
        );
        toast.success(response.data.message, {
          position: "top-center",
          style: {
            width: "80vh",
          },
        });
        setData({
          transaction_type: "deposit",
          amount: "",
          transaction_pin: "",
          description: "",
        });
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          style: {
            width: "80vh",
          },
        });
        console.log(error.response.data.message || "Something went wrong");
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Transaction</h1>

          <p className="mt-1 text-center text-slate-500">
            Deposit or withdraw money from your account
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 md:p-8">
          <form className="space-y-5">
            {/* Transaction Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transaction Type
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => transactionTypeHandle("deposit")}
                  className={`rounded-xl border px-4 py-3 font-semibold transition ${
                    data.transaction_type === "deposit"
                      ? "border-green-600 bg-green-50 text-green-600"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Deposit
                </button>

                <button
                  type="button"
                  onClick={() => transactionTypeHandle("withdrawal")}
                  className={`rounded-xl border px-4 py-3 font-semibold transition ${
                    data.transaction_type === "withdrawal"
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Withdrawal
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={data.amount}
                onChange={(e) => setData({ ...data, amount: e.target.value })}
                placeholder="Enter amount"
                min="1"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>

            {/* Transaction Pin */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transaction Pin
              </label>

              <input
                type="password"
                name="transaction_pin"
                value={data.transaction_pin}
                onChange={(e) =>
                  setData({ ...data, transaction_pin: e.target.value })
                }
                placeholder="Enter transaction pin"
                maxLength="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter transaction description"
                rows="4"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>

            {/* Submit */}
            <ToastContainer />

            <button
              type="submit"
              onClick={submitHandle}
              className={`w-full rounded-xl py-3.5 font-semibold text-white transition ${data.transaction_type === "deposit" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              {data.transaction_type === "deposit"
                ? "Deposit Money"
                : "Withdraw Money"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
