import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/send-resume", upload.single("resume"), async (req, res) => {
  const { name, email, phone, position } = req.body;
  const resumeFile = req.file;

  if (!name || !email || !phone || !position || !resumeFile) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Новое резюме: ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nЖелаемая должность: ${position}`,
      attachments: [{ filename: resumeFile.originalname, path: resumeFile.path }],
    });

    res.json({ message: "Резюме успешно отправлено!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при отправке резюме" });
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
