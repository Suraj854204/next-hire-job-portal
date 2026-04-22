import express from "express";
import authRoutes from "./routes/auth.js";
import { connectKafka } from "./producer.js";
import cors from "cors";
import complaintRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

connectKafka();

app.use("/api/auth", authRoutes);
app.use("/api", complaintRoutes);

export default app;