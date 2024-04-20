import EmployeeRepository from "./employee.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class EmployeeController {
  constructor() {
    this.empolyeeRepository = new EmployeeRepository();
  }
  async create(req, res, next) {
    try {
      const employee = await this.empolyeeRepository.create(req.body);
      if (!employee) {
        return res
          .status(400)
          .json({ success: false, message: "Cannot create Employee" });
      }
      res.status(200).json({
        success: true,
        message: "Employee registered successfully",
        data: employee,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signin(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new ApplicationError("Email and password are mandatory", 500);
      }
      const employee = await this.empolyeeRepository.findByEmail(email);
      if (!employee) {
        throw new ApplicationError("Invalid credentials", 500);
      }
      const isValid = await bcrypt.compare(password, employee.password);
      if (!isValid) {
        throw new ApplicationError("Invalid credentials", 500);
      } else {
        const token = jwt.sign(
          {
            employeeId: employee._id,
            employeeRole: employee.role,
            employeeName: employee.name,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        // save the token in cookies and send
        res.cookie("authToken", token, {
          path: "/",
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          success: true,
          message: "Employee successfully logged in.",
          data: token,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getbyId(req, res, next) {
    const { id } = req.params;
    try {
      const employee = await this.empolyeeRepository.getById(id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee cannot be found. Invalid Employee Id",
        });
      }
      res.status(200).json({ success: true, message: "", data: employee });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const employees = await this.empolyeeRepository.getAll();
      res.status(200).json({ success: true, message: "", data: employees });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const employee = await this.empolyeeRepository.update(id, req.body);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Invalid employee Id. Employee not found with given Id",
        });
      }
      res.status(200).json({
        success: true,
        message: "",
        data: employee,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await this.empolyeeRepository.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Employee successfully deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
