import jwt from "jsonwebtoken";

export const Auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Check if the authorization header exists and contains a token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access. Please contact admin.",
    });
  }

  // Extract the JWT token from the authorization header
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.employeeId = payload.employeeId;
    req.employeeName = payload.employeeName;
    req.employeeRole = payload.employeeRole;
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access. Please contact admin.",
    });
  }
  next();
};

//Admin auth to check whether the user is Admin and as well as authenticated
export const AdminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Check if the authorization header exists and contains a token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access. Please contact admin.",
    });
  }

  // Extract the JWT token from the authorization header
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload.employeeRole !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access. Please contact admin.",
      });
    }
    req.employeeId = payload.employeeId;
    req.employeeRole = payload.employeeRole;
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access. Please contact admin.",
    });
  }
  next();
};
