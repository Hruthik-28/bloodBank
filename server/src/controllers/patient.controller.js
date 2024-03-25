import { pool } from "../index.js";

// Controller to list request history of a patient
export const requestHistory = (req, res) => {
    const { patientId } = req.params;

    // Retrieve request history for the patient from the database
    pool.query(
        "SELECT Requests.*, Patients.* FROM Requests LEFT JOIN Patients ON Requests.patient_id = Patients.patient_id WHERE Requests.patient_id = ?",
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
                return res.status(500).json({
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
                        return res.status(500).json({
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

export const loginPatient = (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide email and password" });
    }

    // Check if the email and password match a donor record in the database
    pool.query(
        "SELECT * FROM Patients WHERE email = ? AND password = ?",
        [email.trim(), password],
        (err, results) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({
                    message: "An error occurred while processing your request",
                });
            }

            // If no PATIENT found with provided email and password
            if (results.length === 0) {
                return res
                    .status(401)
                    .json({ message: "Invalid email or password" });
            }

            // If PATIENT is found, create a session or token for authentication
            const patient = results[0];
            res.status(200).json({
                message: "Login successful",
                patientId: patient.patient_id,
            });
        }
    );
};

export const registerPatient = (req, res) => {
    const { name, email, password, mobile, bloodGroup, diseaseStatus } = req.body;

    // Validate inputs
    if (!name || !email || !password || !mobile || !bloodGroup || !diseaseStatus) {
        return res.status(400).json({ message: "Please provide all required information" });
    }

    // Check if the email is already registered
    pool.query(
        "SELECT * FROM Patients WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ message: "An error occurred while processing your request" });
            }

            // If email already exists
            if (results.length > 0) {
                return res.status(409).json({ message: "Email already exists" });
            }

            // Insert new patient record into Donors table
            pool.query(
                "INSERT INTO Patients (name, email, password, mobile, blood_group, disease_status) VALUES (?, ?, ?, ?, ?, ?)",
                [name, email, password, mobile, bloodGroup, diseaseStatus],
                (err, result) => {
                    if (err) {
                        console.error("Error registering donor:", err);
                        return res.status(500).json({ message: "An error occurred while registering donor" });
                    }

                    // Send success response
                    res.status(201).json({ message: "Registration successful" });
                }
            );
        }
    );
};
