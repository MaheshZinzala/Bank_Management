import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import usersroute from "../src/router/user.router.js";
import transactionroute from "../src/router/transaction.route.js";
import dashboard from "../src/router/dashboard.router.js";
// Router
app.use("/api/v1/user", usersroute);
app.use("/api/v1/transaction", transactionroute);
app.use("", dashboard);
export default app;
