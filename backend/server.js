import express from "express";
import MongooseConnect from "./src/config/mongoose.config.js";
import { AdminAuth, Auth } from "./src/middleware/auth.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/handleError.middleware.js";
import EmployeeRoute from "./src/features/employee/employee.routes.js";
import ReviewRoutes from "./src/features/review/review.routes.js";

const app = express();

//config body parser
app.use(express.json());

//cors config
app.use(cors());

//config cookie parser
app.use(cookieParser());

//Employee Routes
app.use("/api/employee", EmployeeRoute);
//Review Routes
app.use("/api/review", Auth, ReviewRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Invalid route, Please check the route and try again",
  });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Application is listening at port ${process.env.PORT}`);
  MongooseConnect();
});
