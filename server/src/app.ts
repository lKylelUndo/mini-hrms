import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env";
import routes from "./routes/index"

const app = express();

app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: `${ENV.APP_NAME} instance is healthy!`
    })
})

// All Routes
app.use("/api", routes);

// 404 Handler - Incorrect Routes etc.
app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: `Cannot  ${req.method} ${req.originalUrl}`
    })
})

export default app;