import { Router } from "express";
import {
    requestBlood,
    requestHistory,
} from "../controllers/patient.controller.js";

const router = Router();

router.route("/requestHistory/:patientId").get(requestHistory);
router.route("/requestBlood").post(requestBlood);

export default router;
