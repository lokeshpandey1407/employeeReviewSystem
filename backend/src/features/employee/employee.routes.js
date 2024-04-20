import express from "express";
import EmployeeController from "./employee.controller.js";
import { AdminAuth, Auth } from "../../middleware/auth.middleware.js";

const EmployeeRoute = express.Router();
const employeeController = new EmployeeController();

EmployeeRoute.post("/signup", (req, res, next) => {
  employeeController.create(req, res, next);
});

EmployeeRoute.post("/signin", (req, res, next) => {
  employeeController.signin(req, res, next);
});

EmployeeRoute.get("/:id", Auth, (req, res, next) => {
  employeeController.getbyId(req, res, next);
});

EmployeeRoute.get("/", AdminAuth, (req, res, next) => {
  employeeController.getAll(req, res, next);
});

EmployeeRoute.put("/:id", AdminAuth, (req, res, next) => {
  employeeController.update(req, res, next);
});

EmployeeRoute.delete("/:id", (req, res, next) => {
  employeeController.delete(req, res, next);
});

export default EmployeeRoute;
