import express from "express";
import EmployeeController from "./employee.controller.js";
import { AdminAuth, Auth } from "../../middleware/auth.middleware.js";

const EmployeeRoute = express.Router();
const employeeController = new EmployeeController();

//Register or create an employee
EmployeeRoute.post("/signup", (req, res, next) => {
  employeeController.create(req, res, next);
});

//Sign in a employee
EmployeeRoute.post("/signin", (req, res, next) => {
  employeeController.signin(req, res, next);
});

//Get employee by id
EmployeeRoute.get("/:id", Auth, (req, res, next) => {
  employeeController.getbyId(req, res, next);
});

//Get all employees
EmployeeRoute.get("/", AdminAuth, (req, res, next) => {
  employeeController.getAll(req, res, next);
});

//Update an employee
EmployeeRoute.put("/:id", AdminAuth, (req, res, next) => {
  employeeController.update(req, res, next);
});

//Delete an employee
EmployeeRoute.delete("/:id", (req, res, next) => {
  employeeController.delete(req, res, next);
});

export default EmployeeRoute;
