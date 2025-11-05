import express from "express";
import { db } from "./models/db.js";
import dotenv from "dotenv";
import employeesRoutes from "./routes/employees.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(express.json());
app.use("/api/employees", employeesRoutes);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 + 1 AS result");
        res.send(`Подключение к MYSQL успешно! 1 + 1 = ${rows[0].result}`);
    } catch (err) {
        res.status(500).send("Ошибка подключения: " + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен! Порт ${PORT}`);
});
