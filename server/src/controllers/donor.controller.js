import { pool } from "../index.js";

// Controller for donating blood

export const donateBlood = (req, res) => {
    const { donorId, bloodGroup, unitsDonated } = req.body;

    // Validate inputs
    if (!donorId || !bloodGroup || !unitsDonated) {
        return res
            .status(400)
            .json({ message: "Please provide all required information" });
    }

    // Insert donation record into Donations table
    pool.query(
        "INSERT INTO Donations (donor_id, blood_group, units_donated) VALUES (?, ?, ?)",
        [donorId, bloodGroup, unitsDonated],
        (err, result) => {
            if (err) {
                console.error("Error donating blood:", err);
                return res
                    .status(500)
                    .json({
                        message: "An error occurred while donating blood",
                    });
            }

            // Increment total_donated_units in Donors table
            pool.query(
                "UPDATE Donors SET total_donated_units = total_donated_units + ? WHERE donor_id = ?",
                [unitsDonated, donorId],
                (err, result) => {
                    if (err) {
                        console.error(
                            "Error updating donor's total donated units:",
                            err
                        );
                        return res
                            .status(500)
                            .json({
                                message:
                                    "An error occurred while updating donor's total donated units",
                            });
                    }

                    // Send success response
                    res.status(200).json({
                        message: "Blood donation successful",
                    });
                }
            );
        }
    );
};

// Controller to view donation history of a donor
export const viewDonationHistory = (req, res) => {
    const { donorId } = req.params;
    console.log(donorId);
    // Query to fetch donation history of the donor from Donations table
    pool.query(
        "SELECT * FROM Donations WHERE donor_id = ?",
        [donorId],
        (err, results) => {
            if (err) {
                console.error("Error fetching donation history:", err);
                return res
                    .status(500)
                    .json({
                        message:
                            "An error occurred while fetching donation history",
                    });
            }

            // Send donation history as response
            res.status(200).json(results);
        }
    );
};

// Login Controller for donors
export const loginDonor = (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    // Check if the email and password match a donor record in the database
    pool.query(
        "SELECT * FROM Donors WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ message: "An error occurred while processing your request" });
            }

            // If no donor found with provided email and password
            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // If donor is found, create a session or token for authentication
            const donor = results[0];
            res.status(200).json({ message: "Login successful", donorId: donor.donor_id });
        }
    );
};

// Register Controller for donors
export const registerDonor = (req, res) => {
    const { name, email, password, mobile, bloodGroup, diseaseStatus } = req.body;

    // Validate inputs
    if (!name || !email || !password || !mobile || !bloodGroup || !diseaseStatus) {
        return res.status(400).json({ message: "Please provide all required information" });
    }

    // Check if the email is already registered
    pool.query(
        "SELECT * FROM Donors WHERE email = ?",
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

            // Insert new donor record into Donors table
            pool.query(
                "INSERT INTO Donors (name, email, password, mobile, blood_group, disease_status) VALUES (?, ?, ?, ?, ?, ?)",
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

