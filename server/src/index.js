import { connectToDB } from "./db/dbConnect.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env", // if giving prob try "./.env"
});

let pool;

connectToDB()
    .then((p) => {
        pool = p;
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is listening at ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => console.log("SQL connection failed", error));

export { pool };
