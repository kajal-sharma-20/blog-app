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
    origin: ["http://localhost:3000",
            "https://blog-app-2-xabg.onrender.com"
            ],
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
