import { Router } from "express";
import {
    dashboard,
    deleteDonor,
    deletePatient,
    editDonor,
    editPatient,
    listDonations,
    listDonors,
    listPatients,
    listRequests,
    loginAdmin,
    manageDonation,
    manageRequests,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/dashboard").get(dashboard);
router.route("/listDonors").get(listDonors);
router.route("/editDonor/:donorId").patch(editDonor);
router.route("/deleteDonor/:donorId").delete(deleteDonor);
router.route("/listPatients").get(listPatients);
router.route("/editPatient/:patientId").patch(editPatient);
router.route("/deletePatient/:patientId").delete(deletePatient);
router.route("/listDonations").get(listDonations);
router.route("/manageDonation/:donationId/:action").post(manageDonation);
router.route("/listRequests").get(listRequests);
router.route("/manageRequests/:requestId/:action").post(manageRequests);

export default router;
