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
    origin: [
      "http://localhost:3000", // Local frontend
      "https://blog-app-0bqe.onrender.com", // Render frontend
    ],
    credentials: true,
  })
);

app.use("/api", route);
app.get("/",(req,res)=>{
  res.send("backend starts")
})
connectDB()
  .then(() => {
    initAdminOnStart();
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });

//Use Render's dynamic PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
