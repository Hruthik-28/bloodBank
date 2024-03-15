import { pool } from "../index.js";

// Controller to list request history of a patient
export const requestHistory = (req, res) => {
    const { patientId } = req.params;

    // Retrieve request history for the patient from the database
    pool.query(
        "SELECT * FROM Requests WHERE patient_id = ?",
        [patientId],
        (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({
                    message: "An error occurred while processing your request",
                });
            }
            console.log(result);
            res.status(200).json(result);
        }
    );
};

// Controller for requesting blood
export const requestBlood = (req, res) => {
    const { patientId, bloodGroup, unitsRequested } = req.body;

    // Validate inputs
    if (!patientId || !bloodGroup || !unitsRequested) {
        return res
            .status(400)
            .json({ message: "Please provide all required information" });
    }

    // Insert blood request into Requests table
    pool.query(
        "INSERT INTO Requests (patient_id, blood_group, units_requested) VALUES (?, ?, ?)",
        [patientId, bloodGroup, unitsRequested],
        (err, result) => {
            if (err) {
                console.error("Error requesting blood:", err);
                return res
                    .status(500)
                    .json({
                        message: "An error occurred while requesting blood",
                    });
            }

            // Update patient's request counts in Patients table
            pool.query(
                "UPDATE Patients SET total_requests = total_requests + 1, requests_pending = requests_pending + 1 WHERE patient_id = ?",
                [patientId],
                (err, result) => {
                    if (err) {
                        console.error(
                            "Error updating patient's request counts:",
                            err
                        );
                        return res
                            .status(500)
                            .json({
                                message:
                                    "An error occurred while updating patient's request counts",
                            });
                    }

                    // Send success response
                    res.status(201).json({
                        message: "Blood request created successfully",
                    });
                }
            );
        }
    );
};