import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import ChangeTransactionPin from "./components/ChangeTransacrtionPin.jsx";
import Deposit from "./components/Deposit.jsx";
import Withdrawal from "./components/Withdrawal.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/changepin" element={<ChangeTransactionPin />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdrawal" element={<Withdrawal />} />
      <Route path="/home" element={<Home />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
