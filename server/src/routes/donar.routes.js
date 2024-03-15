import { Router } from "express";
import {donateBlood, loginDonor, registerDonor, viewDonationHistory} from "../controllers/donor.controller.js"

const router = Router();
router.route("/donateBlood").post(donateBlood);
router.route("/viewDonationHistory/:donorId").get(viewDonationHistory);
router.route("/login").post(loginDonor);
router.route("/register").post(registerDonor);

export default router;