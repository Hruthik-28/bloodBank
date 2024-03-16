import asynsHandler from "../utils/asyncHandler.js";
import { pool } from "../index.js";

export const loginAdmin = (req, res) => {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Please provide username and password" });
    }

    // Check if the username and password match an admin record in the database
    pool.query(
        "SELECT * FROM Admins WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({
                    message: "An error occurred while processing your request",
                });
            }

            // If no admin found with provided username and password
            if (results.length === 0) {
                return res
                    .status(401)
                    .json({ message: "Invalid username or password" });
            }

            // If admin is found, create a session or token for authentication
            const admin = results[0];
            res.status(200).json({
                message: "Login successful",
                adminId: admin.admin_id,
            });
        }
    );
};

export const dashboard = (req, res) => {
    // Fetch all blood groups and total units from BloodStock table
    pool.query("SELECT * FROM BloodStock", (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "An error occurred while processing your request",
            });
        }

        // Send blood group data as response
        res.status(200).json(results);
    });
};

export const listDonors = (req, res) => {
    // Fetch all donors from Donors table
    pool.query("SELECT * FROM Donors", (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "An error occurred while processing your request",
            });
        }

        // Send list of donors as response
        res.status(200).json(results);
    });
};

// Edit Donor Controller
export const editDonor = (req, res) => {
    const { donorId } = req.params;
    const { name, email, mobile, blood_group, disease_status } = req.body;
    // Update donor information in the database
    pool.query(
        "UPDATE Donors SET name = ?, email = ?, mobile = ?, blood_group = ?, disease_status = ? WHERE donor_id = ?",
        [name, email, mobile, blood_group, disease_status, donorId],
        (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({
                    message: "An error occurred while processing your request",
                });
            }

            // Send success response
            res.status(200).json({
                message: "Donor information updated successfully",
            });
        }
    );
};

// Delete Donor Controller
export const deleteDonor = (req, res) => {
    const { donorId } = req.params;

    // Delete donor from the database
    pool.query(
        "DELETE FROM Donations WHERE donor_id = ?",
        [donorId],
        (err, result) => {
            if (err) {
                console.error("Error deleting associated donations:", err);
                return res.status(500).json({
                    message:
                        "An error occurred while deleting associated donations",
                });
            }

            // After deleting associated donations, delete the donor from the database
            pool.query(
                "DELETE FROM Donors WHERE donor_id = ?",
                [donorId],
                (err, result) => {
                    if (err) {
                        console.error("Error deleting donor:", err);
                        return res.status(500).json({
                            message:
                                "An error occurred while deleting the donor",
                        });
                    }

                    // Send success response
                    res.status(200).json({
                        message:
                            "Donor and associated donations deleted successfully",
                    });
                }
            );
        }
    );
};

// List Patients Controller
export const listPatients = (req, res) => {
    // Fetch all patients from Patients table
    pool.query("SELECT * FROM Patients", (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "An error occurred while processing your request",
            });
        }

        // Send list of patients as response
        res.status(200).json(results);
    });
};

// Edit Patient Controller
export const editPatient = (req, res) => {
    const { patientId } = req.params;
    const { name, email, mobile, blood_group } = req.body;

    // Update patient information in the database
    pool.query(
        "UPDATE Patients SET name = ?, email = ?, mobile = ?, blood_group = ? WHERE patient_id = ?",
        [name, email, mobile, blood_group, patientId],
        (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({
                    message: "An error occurred while processing your request",
                });
            }

            // Send success response
            res.status(200).json({
                message: "Patient information updated successfully",
            });
        }
    );
};

// Delete Patient Controller
export const deletePatient = (req, res) => {
    const { patientId } = req.params;

    // Delete patient from the database
    pool.query(
        "DELETE FROM Patients WHERE patient_id = ?",
        [patientId],
        (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({
                    message: "An error occurred while processing your request",
                });
            }

            // Send success response
            res.status(200).json({ message: "Patient deleted successfully" });
        }
    );
};

// List Donations Controller
export const listDonations = (req, res) => {
    // Fetch all donations from Donations table
    const query = `
        SELECT d.*, 
               dn.name AS donor_name, 
               dn.email AS donor_email, 
               dn.mobile AS donor_mobile 
          FROM Donations d 
               INNER JOIN Donors dn ON d.donor_id = dn.donor_id
    `;

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "An error occurred while processing your request",
            });
        }

        // Send list of donations as response
        res.status(200).json(results);
    });
};

// Manage Donation Controller
// Manage Donation Controller
export const manageDonation = (req, res) => {
    const { donationId, action } = req.params;
    console.log(donationId, action);
    // Check if the action is valid
    if (!["approve", "reject"].includes(action)) {
        return res.status(400).json({ message: "Invalid action" });
    }

    // Update donation status in the Donations table
    pool.query(
        "UPDATE Donations SET donation_status = ? WHERE donation_id = ?",
        [action === "approve" ? "approved" : "rejected", donationId],
        (err, result) => {
            if (err) {
                console.error("Error updating donation status:", err);
                return res.status(500).json({
                    message: "An error occurred while updating donation status",
                });
            }

            // If donation is approved, update BloodStock table and Donors table
            if (action === "approve") {
                // Retrieve blood group and units donated from the donation details
                pool.query(
                    "SELECT blood_group, units_donated, donor_id FROM Donations WHERE donation_id = ?",
                    [donationId],
                    (err, result) => {
                        if (err) {
                            console.error(
                                "Error retrieving donation details:",
                                err
                            );
                            return res.status(500).json({
                                message:
                                    "An error occurred while retrieving donation details",
                            });
                        }

                        // Extract blood group, units donated, and donor id from the donation details
                        const { blood_group, units_donated, donor_id } =
                            result[0];

                        // Update BloodStock table to increase total units for the blood group
                        pool.query(
                            "UPDATE BloodStock SET total_units = total_units + ? WHERE blood_group = ?",
                            [units_donated, blood_group],
                            (err, result) => {
                                if (err) {
                                    console.error(
                                        "Error updating BloodStock:",
                                        err
                                    );
                                    return res.status(500).json({
                                        message:
                                            "An error occurred while updating BloodStock",
                                    });
                                }

                                // Update Donors table to increase total donated units for the donor
                                pool.query(
                                    "UPDATE Donors SET total_donated_units = total_donated_units + ? WHERE donor_id = ?",
                                    [units_donated, donor_id],
                                    (err, result) => {
                                        if (err) {
                                            console.error(
                                                "Error updating Donors:",
                                                err
                                            );
                                            return res.status(500).json({
                                                message:
                                                    "An error occurred while updating Donors",
                                            });
                                        }

                                        // Send success response
                                        res.status(200).json({
                                            message:
                                                "Donation approved, BloodStock and Donors updated successfully",
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            } else {
                // Send success response if donation is rejected without updating BloodStock and Donors
                res.status(200).json({ message: "Donation rejected" });
            }
        }
    );
};

// List Requests Controller
export const listRequests = (req, res) => {
    // Fetch all requests from Requests table
    pool.query("SELECT * FROM Requests", (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "An error occurred while processing your request",
            });
        }

        // Send list of requests as response
        res.status(200).json(results);
    });
};

// Manage Requests Controller
export const manageRequests = (req, res) => {
    const { requestId, action } = req.params;
    console.log(requestId, action);

    // Check if the action is valid
    if (!["approve", "reject"].includes(action)) {
        return res.status(400).json({ message: "Invalid action" });
    }

    // Update request status in the Requests table
    pool.query(
        "UPDATE Requests SET request_status = ? WHERE request_id = ?",
        [action === "approve" ? "approved" : "rejected", requestId],
        (err, result) => {
            if (err) {
                console.error("Error updating request status:", err);
                return res.status(500).json({
                    message: "An error occurred while updating request status",
                });
            }

            // If action is to approve the request
            if (action === "approve") {
                // Retrieve blood group and units requested from the request details
                pool.query(
                    "SELECT blood_group, units_requested FROM Requests WHERE request_id = ?",
                    [requestId],
                    (err, result) => {
                        if (err) {
                            console.error(
                                "Error retrieving request details:",
                                err
                            );
                            return res.status(500).json({
                                message:
                                    "An error occurred while retrieving request details",
                            });
                        }

                        // Extract blood group and units requested from the request details
                        const { blood_group, units_requested } = result[0];

                        // Check if there are enough units available in BloodStock
                        pool.query(
                            "SELECT total_units FROM BloodStock WHERE blood_group = ?",
                            [blood_group],
                            (err, result) => {
                                if (err) {
                                    console.error(
                                        "Error retrieving blood stock:",
                                        err
                                    );
                                    return res.status(500).json({
                                        message:
                                            "An error occurred while retrieving blood stock",
                                    });
                                }

                                const totalUnitsAvailable =
                                    result[0].total_units;

                                // If sufficient units are available, update BloodStock and send success response
                                if (totalUnitsAvailable >= units_requested) {
                                    pool.query(
                                        "UPDATE BloodStock SET total_units = total_units - ? WHERE blood_group = ?",
                                        [units_requested, blood_group],
                                        (err, result) => {
                                            if (err) {
                                                console.error(
                                                    "Error updating BloodStock:",
                                                    err
                                                );
                                                return res.status(500).json({
                                                    message:
                                                        "An error occurred while updating BloodStock",
                                                });
                                            }

                                            // Update total_requests, requests_pending, requests_accepted, or requests_rejected in Patients table
                                            pool.query(
                                                "SELECT patient_id FROM Requests WHERE request_id = ?",
                                                [requestId],
                                                (err, result) => {
                                                    if (err) {
                                                        console.error(
                                                            "Error retrieving patient id from request:",
                                                            err
                                                        );
                                                        return res
                                                            .status(500)
                                                            .json({
                                                                message:
                                                                    "An error occurred while retrieving patient id from request",
                                                            });
                                                    }

                                                    const patientId =
                                                        result[0].patient_id;

                                                    // Increment requests_accepted and decrement requests_pending
                                                    pool.query(
                                                        "UPDATE Patients SET total_requests = total_requests + 1, requests_pending = requests_pending - 1, requests_accepted = requests_accepted + 1 WHERE patient_id = ?",
                                                        [patientId],
                                                        (err, result) => {
                                                            if (err) {
                                                                console.error(
                                                                    "Error updating Patients table:",
                                                                    err
                                                                );
                                                                return res
                                                                    .status(500)
                                                                    .json({
                                                                        message:
                                                                            "An error occurred while updating Patients table",
                                                                    });
                                                            }

                                                            // Send success response
                                                            res.status(
                                                                200
                                                            ).json({
                                                                message:
                                                                    "Request approved and Patients table updated successfully",
                                                            });
                                                        }
                                                    );
                                                }
                                            );

                                            // Send success response
                                            res.status(200).json({
                                                message:
                                                    "Request approved and BloodStock updated successfully",
                                            });
                                        }
                                    );
                                } else {
                                    // If there are not enough units available, set request_status to "rejected" and send a message
                                    pool.query(
                                        "UPDATE Requests SET request_status = 'rejected' WHERE request_id = ?",
                                        [requestId],
                                        (err, result) => {
                                            if (err) {
                                                console.error(
                                                    "Error updating request status to 'rejected':",
                                                    err
                                                );
                                                return res.status(500).json({
                                                    message:
                                                        "An error occurred while updating request status to 'rejected'",
                                                });
                                            }

                                            // Send a message indicating insufficient blood units available in stock
                                            res.status(400).json({
                                                message:
                                                    "Insufficient blood units available in stock. Request rejected.",
                                            });
                                        }
                                    );
                                }
                            }
                        );
                    }
                );
            } else {
                // Send success response if request is rejected
                res.status(200).json({ message: "Request rejected" });
            }
        }
    );
};
