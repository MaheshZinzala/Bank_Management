import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import usersrouter from "../src/router/user.router.js";
// Router
app.use("/api/v1/user", usersrouter);
export default app;
