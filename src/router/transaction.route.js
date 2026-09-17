import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  depositApi,
  passbookApi,
  withdrawalApi,
} from "../controllers/transacation.controller.js";
const router = Router();

router.route("/deposit").post(verifyJWT, depositApi);
router.route("/withdrawal").post(verifyJWT, withdrawalApi);
router.route("/passbook").get(verifyJWT, passbookApi);
export default router;
