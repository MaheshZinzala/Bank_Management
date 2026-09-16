import { Router } from "express";
import {
  changePassword,
  changeTrasactionPin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  showBalance,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/changePassword").post(verifyJWT, changePassword);
router.route("/changePin").post(verifyJWT, changeTrasactionPin);
router.route("/showBalance").post(verifyJWT, showBalance);

export default router;
