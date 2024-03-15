import mysql from "mysql2";

export const connectToDB = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            waitForConnections: true,
        });
        if (pool) {
            console.log("db connect success");
        }
        return pool;
    } catch (error) {
        console.log("SQL DB CONNECTION FAILED", error);
        process.exit(1);
    }
};
