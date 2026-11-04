import express from "express"
import cors from "cors"
import "dotenv/config"
import multer from "multer"

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

// Routes
app.get("/", (req, res) => res.send("Welcome Home"))

app.listen(PORT, () => console.log(`Server is Listening on PORT:${PORT}`))

