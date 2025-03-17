import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./db.js";
import todoroutes from "./routes/todoroute.js";
import authroutes from "./routes/user_route.js";
import { authenticateToken } from "./controllers/auth.js";

const app = express();

app.use(express.json());
app.use(cors());
connectdb();

app.use("/api/todos", authenticateToken, todoroutes);
app.use("/api/auth", authroutes);
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
