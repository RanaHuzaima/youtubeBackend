import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { FormDatalimit } from "./constants"

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(express.json({ limit: FormDatalimit }))

app.use(express.urlencoded({ extended: true, limit: FormDatalimit }))

app.use(express.static("public"))

app.use(cookieParser())

export { app }

