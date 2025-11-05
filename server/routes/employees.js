import express from "express";
import { showAllEmployees, showEmployee, createEmployee } from "../controllers/employeesController.js";

const router = express.Router();

router.get("/", showAllEmployees);

router.get("/:id", showEmployee);

router.post("/", createEmployee);

export default router;
