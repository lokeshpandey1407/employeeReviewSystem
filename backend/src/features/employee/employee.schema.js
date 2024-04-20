import mongoose from "mongoose";
import bcrypt from "bcrypt";

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profile: { type: String, required: true },
    email: { type: String, reqruied: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["Admin", "Employee"] },
    manager: { type: String, required: true },
    participatedInPerformanceReviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    performanceReviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    ],
  },
  { timeStamp: true }
);

EmployeeSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
  this.reviews = [];
  this.participatedInPerformanceReviews = [];
  this.performanceReviews = [];
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;
