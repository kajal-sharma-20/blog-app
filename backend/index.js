import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/lib.js";
import route from "./routes/route.js";
import { initAdminOnStart } from "./utils/initadmin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://blog-app-4z49.onrender.com",
    credentials: true,
  })
);
app.use("/api", route);

connectDB()
  .then(() => {
    initAdminOnStart();
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1)
  });

  app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello" });
  });
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
