import EmployeeModel from "./employee.schema.js";

export default class EmployeeRepository {
  async create(data) {
    return await new EmployeeModel(data).save();
  }

  async getById(id) {
    return await EmployeeModel.findById(id).populate({
      path: "participatedInPerformanceReviews",
      populate: [
        { path: "employee", select: "-password" },
        { path: "reviewer", select: "-password" },
      ],
    });
  }

  async findByEmail(email) {
    return await EmployeeModel.findOne({ email });
  }

  async getAll() {
    return await EmployeeModel.find(
      {},
      { name: 1, email: 1, role: 1, profile: 1, manager: 1 }
    );
  }

  async update(id, data) {
    return await EmployeeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    await EmployeeModel.findByIdAndDelete(id);
  }
}
