import ReviewModel from "./review.schema.js";
import EmployeeModel from "../employee/employee.schema.js";

export default class ReviewRepository {
  async create(data) {
    const { employee, participants } = data;
    const review = await new ReviewModel(data).save();

    //update that review in the employee schema
    await EmployeeModel.findByIdAndUpdate(
      { _id: employee },
      { $push: { performanceReviews: review._id, reviews: review._id } }
    );

    if (participants.length > 0) {
      for (const participant of participants) {
        // add this review to those participant's participatedInPerformanceReviews Array
        await EmployeeModel.findByIdAndUpdate(
          { _id: participant },
          { $push: { participatedInPerformanceReviews: review._id } }
        );
      }
    }
    return review;
  }

  async getById(id) {
    return await ReviewModel.findById(id);
  }

  async getAll() {
    return await ReviewModel.find()
      .populate("employee")
      .populate("participants")
      .populate({ path: "reviewer", select: "name email" });
  }

  async getAllByEmployeeId(employee) {
    return await ReviewModel.find(employee)
      .populate("reviewer")
      .populate({ path: "participants", select: "-password" })
      .populate("employee");
  }

  async update(id, data) {
    return await ReviewModel.findByIdAndUpdate(id, data, { new: true });
  }
}
