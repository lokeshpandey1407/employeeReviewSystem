import mongoose from "mongoose";
import ApplicationError from "../middleware/handleError.middleware.js";

//Mongoose connection configuration
const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Database is connected");
  } catch (error) {
    throw new ApplicationError("Something went wrong, Please try again", 500);
  }
};
export default MongooseConnect;
