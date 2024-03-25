import { Router } from "express";
import {
    loginPatient,
    registerPatient,
    requestBlood,
    requestHistory,
} from "../controllers/patient.controller.js";

const router = Router();

router.route("/requestHistory/:patientId").get(requestHistory);
router.route("/requestBlood").post(requestBlood);
router.route("/login").post(loginPatient);
router.route("/register").post(registerPatient);

export default router;
