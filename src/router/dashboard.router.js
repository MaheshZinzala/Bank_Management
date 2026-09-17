import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { dashboardApi } from "../controllers/dashboard.controller.js";
const router = Router();

router.route("/dashboard").get(verifyJWT, dashboardApi);
export default router;
