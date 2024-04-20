import ReviewRepository from "./review.repository.js";

export default class ReviewController {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  //To create a review
  async create(req, res, next) {
    const employeeId = req.employeeId;
    try {
      const data = { reviewer: employeeId, ...req.body };
      const review = await this.reviewRepository.create(data);
      if (!review) {
        return res
          .status(400)
          .json({ success: false, message: "Cannot create Review" });
      }
      res.status(200).json({ success: true, message: "", data: review });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //To get the review by Id
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const review = await this.reviewRepository.getById(id);
      if (!review) {
        return res
          .status(404)
          .json({ success: false, message: "Review not found" });
      }
      res.status(200).json({ success: true, message: "", data: review });
    } catch (error) {
      next(error);
    }
  }

  //get all reviews
  async getAll(req, res, next) {
    try {
      const reviews = await this.reviewRepository.getAll();
      res.status(200).json({ success: true, message: "", data: reviews });
    } catch (error) {
      next(error);
    }
  }

  //get All reviews by employee Id
  async getAllByEmployeeId(req, res, next) {
    const { employeeId } = req.params;
    try {
      const reviews = await this.reviewRepository.getAllByEmployeeId({
        employee: employeeId,
      });
      res.status(200).json({ success: true, message: "", data: reviews });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //This controller will take care both the Review update and the feedback update which will be given by employee
  async update(req, res, next) {
    const { id } = req.params;
    try {
      const review = await this.reviewRepository.update(id, req.body);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found, Invalid Review id.",
        });
      }
      res.status(200).json({ success: true, message: "", data: review });
    } catch (error) {
      next(error);
    }
  }
}
