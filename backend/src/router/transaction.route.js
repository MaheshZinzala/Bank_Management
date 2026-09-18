import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  dateWiseSearch,
  depositApi,
  descriptionWiseSearch,
  passbookApi,
  transacationWiseSearch,
  withdrawalApi,
} from "../controllers/transacation.controller.js";
const router = Router();

router.route("/deposit").post(verifyJWT, depositApi);
router.route("/withdrawal").post(verifyJWT, withdrawalApi);
router.route("/passbook").get(verifyJWT, passbookApi);
router.route("/search/transaction").get(verifyJWT, transacationWiseSearch);
router.route("/search/description").get(verifyJWT, descriptionWiseSearch);
router.route("/search/date").get(verifyJWT, dateWiseSearch);
export default router;
