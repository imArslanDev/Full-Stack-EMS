import "dotenv/config"
import connectDB from "./config/db.js"
import User from "./models/User.model.js"
import bcrypt from "bcrypt"

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

        if(!ADMIN_EMAIL || !ADMIN_PASSWORD) {
            console.log("Missing ADMIN_EMAIL or ADMIN_PASSWORD env variable")
            process.exit(1)
        }

        await connectDB()

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)
        const admin = await User.findOneAndUpdate(
            { email: ADMIN_EMAIL },
            { email: ADMIN_EMAIL, password: hashedPassword, role: "ADMIN" },
            { new: true, upsert: true, runValidators: true }
        )
        
        console.log("Admin user created or password reset")
        console.log("\nEmail:", admin.email)
        console.log("\nUse the ADMIN_PASSWORD value from Backend/.env to log in.")

        process.exit(0)
        
    } catch (error) {
        console.error("Seed failed:", error)
        
    }
}

registerAdmin()