import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  review: { type: String, required: true },
  feedback: { type: String, default: "" },
  feedbackStatus: {
    type: String,
    // required: true,
    enum: ["Pending", "Completed"],
    default: "Pending",
  }, //status define the status of feedback, after a success submission of feedback this status will change to completed
});

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
