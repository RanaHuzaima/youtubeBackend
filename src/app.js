import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { FormDatalimit } from "./constants.js"
import { User } from "./models/user.models.js"

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(express.json({ limit: FormDatalimit }))

app.use(express.urlencoded({ extended: true, limit: FormDatalimit }))

app.use(express.static("public"))

app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)


export { app }

