import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import ChangeTransactionPin from "./components/ChangeTransacrtionPin.jsx";
import Transactions from "./components/Transactions.jsx";
import Passbook from "./components/Passbook.jsx";
import Dashboard from "./components/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/changepin" element={<ChangeTransactionPin />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/passbook" element={<Passbook />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
