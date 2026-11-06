import {Router} from "express"
import { changePassword, login, session } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"
 
const authRouter = Router()

authRouter.get("/login", login)
authRouter.post("/session", protect, session)
authRouter.post("/change-password", protect, changePassword)



export default authRouter