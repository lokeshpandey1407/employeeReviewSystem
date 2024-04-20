import express from "express";
import ReviewController from "./review.controller.js";
import { AdminAuth, Auth } from "../../middleware/auth.middleware.js";

const ReviewRoutes = express.Router();
const reviewController = new ReviewController();

ReviewRoutes.get("/:id", (req, res, next) => {
  reviewController.getById(req, res, next);
});

ReviewRoutes.get("/all/:employeeId", (req, res, next) => {
  reviewController.getAllByEmployeeId(req, res, next);
});

ReviewRoutes.post("/", AdminAuth, (req, res, next) => {
  reviewController.create(req, res, next);
});

ReviewRoutes.get("/", AdminAuth, (req, res, next) => {
  reviewController.getAll(req, res, next);
});

ReviewRoutes.put("/:id", Auth, (req, res, next) => {
  reviewController.update(req, res, next);
});

export default ReviewRoutes;
