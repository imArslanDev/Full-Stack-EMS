import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";
import { createPaySlip, getPayslipById, getPayslips } from "../controllers/payslip.controller.js";


const payslipRouter = Router()

payslipRouter.post("/", protect, protectAdmin, createPaySlip)
payslipRouter.get("/", protect,  getPayslips)
payslipRouter.get("/:id", protect,  getPayslipById)

export default payslipRouter