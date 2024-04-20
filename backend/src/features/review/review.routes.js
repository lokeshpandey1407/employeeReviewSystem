import express from "express";
import ReviewController from "./review.controller.js";
import { AdminAuth, Auth } from "../../middleware/auth.middleware.js";

const ReviewRoutes = express.Router();
const reviewController = new ReviewController();

//Get review by id
ReviewRoutes.get("/:id", (req, res, next) => {
  reviewController.getById(req, res, next);
});

//Get all review by employeeId
ReviewRoutes.get("/all/:employeeId", (req, res, next) => {
  reviewController.getAllByEmployeeId(req, res, next);
});

//Create a review
ReviewRoutes.post("/", AdminAuth, (req, res, next) => {
  reviewController.create(req, res, next);
});

//Get All reviews
ReviewRoutes.get("/", AdminAuth, (req, res, next) => {
  reviewController.getAll(req, res, next);
});

//Update a review or submit a feedback by employee
ReviewRoutes.put("/:id", Auth, (req, res, next) => {
  reviewController.update(req, res, next);
});

export default ReviewRoutes;
