import express from "express";
import cors from "cors";

const app = express();
const router = express.Router();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
console.log(process.env);
// routes import
import adminRouter from "./routes/user.routes.js";
import donorRouter from "./routes/donar.routes.js";
import patientRouter from "./routes/patient.routes.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/donor", donorRouter);
app.use("/api/v1/patient", patientRouter);

export default app;
