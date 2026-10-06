import React, { useEffect, useRef, useState } from "react";
import { Card, Statistic, Typography, Input, Select } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  HistoryOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

function Passbook() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("description");

  useEffect(() => {
    axios
      .get("/api/v1/transaction/passbook")
      .then((res) => {
        setData(res.data.findTransection || []);
        setCategory(res.data.findTransection || []);
      })
      .catch((err) => {
        console.error("Error fetching passbook data:", err);
      });

    axios
      .get("/api/v1/user/showBalance")
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((err) => {
        console.error("Error fetching passbook data:", err);
      });
  }, []);

  const totalDeposit = data.reduce((total, val) => {
    if (val.transaction_type === "deposit") {
      return total + Number(val.amount);
    }
    return total;
  }, 0);

  const totalWithdrawal = data.reduce((total, val) => {
    if (val.transaction_type === "withdrawal") {
      return total + Number(val.amount);
    }
    return total;
  }, 0);

  const handleOptions = (value) => {
    if (value === "deposit") {
      let newVal = data.filter((val, id) => {
        return val.transaction_type === "deposit";
      });
      setCategory(newVal);
    } else if (value === "withdrawal") {
      let newVal = data.filter((val, id) => {
        return val.transaction_type === "withdrawal";
      });
      setCategory(newVal);
    } else {
      setCategory(data);
    }
  };

  const handleSearch = async (value) => {
    const searchValue = value.trim();

    if (!searchValue) {
      setCategory(data);
      return;
    }

    try {
      // Description Search
      if (search === "description") {
        const res = await axios.get("/api/v1/transaction/search/description", {
          params: {
            description: searchValue,
          },
        });

        setCategory(res.data.findDescription || []);
      }

      // Transaction Search
      else if (search === "transaction") {
        const res = await axios.get("/api/v1/transaction/search/transaction", {
          params: {
            transaction_type: searchValue,
          },
        });

        setCategory(res.data.transaction || []);
      }

      // Date Search
      else if (search === "date") {
        const res = await axios.get("/api/v1/transaction/search/date", {
          params: {
            date: searchValue,
          },
        });

        setCategory(res.data.findDatewise || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen mt-[5%] bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <Title
              level={2}
              className="!mb-1 !text-slate-800 flex items-center gap-3"
            >
              <WalletOutlined className="text-blue-600" />
              Passbook
            </Title>
            <Text className="text-slate-500">
              Track your income, expenses, and transaction history
            </Text>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow rounded-xl border-slate-200">
            <Statistic
              title={
                <span className="text-slate-500 font-medium">
                  Total Balance
                </span>
              }
              value={balance}
              precision={2}
              prefix="₹"
              valueStyle={{
                color: balance >= 0 ? "#0f172a" : "#dc2626",
                fontWeight: 700,
              }}
            />
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow rounded-xl border-slate-200">
            <Statistic
              title={
                <span className="text-slate-500 font-medium">
                  Total Credits
                </span>
              }
              value={totalDeposit}
              precision={2}
              valueStyle={{ color: "#059669", fontWeight: 700 }}
              prefix={<ArrowUpOutlined className="text-emerald-500" />}
              suffix="₹"
            />
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow rounded-xl border-slate-200">
            <Statistic
              title={
                <span className="text-slate-500 font-medium">Total Debits</span>
              }
              value={totalWithdrawal}
              precision={2}
              valueStyle={{ color: "#dc2626", fontWeight: 700 }}
              prefix={<ArrowDownOutlined className="text-rose-500" />}
              suffix="₹"
            />
          </Card>
        </div>

        {/* Transactions Table Section */}
        <Card
          className="shadow-sm rounded-xl border-slate-200"
          title={
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-1">
              <div className="flex items-center gap-2 text-slate-700">
                <HistoryOutlined />
                <span className="font-semibold text-lg">
                  Transaction History
                </span>
              </div>

              {/* Search Bar & Dropdown UI Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex ps-3 h-11 w-full flex-1 items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  {/* Category Select */}
                  <Select
                    defaultValue="description"
                    variant="borderless"
                    className="w-32 shrink-0 font-medium text-slate-700 md:w-36"
                    options={[
                      { value: "description", label: "Description" },
                      { value: "transaction", label: "Transaction" },
                      { value: "date", label: "Date" },
                    ]}
                    onChange={(value) => setSearch(value)}
                  />
                  {/* Divider */}
                  <div className="h-5 w-[1px] bg-slate-200" />

                  {/* Search Input */}
                  <Input
                    variant="borderless"
                    placeholder="Search transactions..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="min-w-0 flex-1 px-3 text-slate-800 placeholder-slate-400 focus:shadow-none"
                  />

                  {/* Search Icon */}
                  <div className="flex h-full shrink-0 items-center justify-center border-l border-slate-200 bg-slate-50 px-4 text-slate-500">
                    <SearchOutlined className="text-base" />
                  </div>
                </div>

                <Select
                  defaultValue="all"
                  className="w-full sm:w-40"
                  size="middle"
                  suffixIcon={<FilterOutlined className="text-slate-400" />}
                  onChange={(value) => handleOptions(value)}
                  options={[
                    { value: "all", label: "All Transactions" },
                    { value: "deposit", label: "Deposit" },
                    { value: "withdrawal", label: "Withdrawal" },
                  ]}
                />
              </div>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                  <th className="py-3 px-4 font-semibold">Transaction Type</th>
                  <th className="py-3 px-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {category && category.length > 0 ? (
                  category.map((val, idx) => {
                    return (
                      <tr
                        key={val._id || val.id || idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Date Column */}
                        <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                          {val.createdAt
                            ? new Date(val.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "-"}
                        </td>

                        {/* Description Column */}
                        <td className="py-4 px-4 text-slate-800 font-medium max-w-xs truncate">
                          {val.description || "N/A"}
                        </td>

                        {/* Transaction Type Badge */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                              val.transaction_type === "deposit"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {val.transaction_type || "N/A"}
                          </span>
                        </td>

                        {/* Amount Column */}
                        <td className="py-4 px-4 text-right font-semibold whitespace-nowrap">
                          <span
                            className={
                              val.transaction_type === "deposit"
                                ? "text-emerald-600"
                                : "text-rose-600"
                            }
                          >
                            {val.transaction_type === "deposit" ? "+" : "-"}₹
                            {Number(val.amount || 0).toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Passbook;
