import express from "express"
import cors from "cors"
import "dotenv/config"
import multer from "multer"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import employeesRouter from "./routes/employee.routes.js"
import profileRouter from "./routes/profile.routes.js"
import attendanceRouter from "./routes/attendance.routes.js"
import leaveRouter from "./routes/leave.routes.js"
import payslipRouter from "./routes/payslips.routes.js"

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

// Routes
app.get("/", (req, res) => res.send("Welcome Home"))
app.use("/api/auth", authRouter)
app.use("/api/employee", employeesRouter)
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/payslips", payslipRouter)



await connectDB()
app.listen(PORT, () => console.log(`Server is Listening on PORT:${PORT}`))