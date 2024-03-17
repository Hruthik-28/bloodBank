import { Router } from "express";
import {
    loginPatient,
    requestBlood,
    requestHistory,
} from "../controllers/patient.controller.js";

const router = Router();

router.route("/requestHistory/:patientId").get(requestHistory);
router.route("/requestBlood").post(requestBlood);
router.route("/login").post(loginPatient);

export default router;
