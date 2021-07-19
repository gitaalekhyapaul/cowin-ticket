export const errors = {
  BAD_REQUEST: {
    httpStatus: 400,
    message: "Bad Request.",
  },
  INTERNAL_SERVER_ERROR: {
    httpStatus: 500,
    message: "Internal Server Error.",
  },
  UNAUTHORIZED: {
    httpStatus: 401,
    message: "Unauthorized.",
  },
  NOT_FOUND: {
    httpStatus: 404,
    message: "Resource Not Found.",
  },
  MONGODB_CONNECT_ERROR: {
    httpStatus: 500,
    message: "Could Not Connect to MongoDB.",
  },
  JWT_ERROR: {
    httpStatus: 403,
    message: "JWT Token Not Found.",
  },
  CORS_ERROR: {
    httpStatus: 500,
    message: "Not Allowed by CORS.",
  },
  MONGODB_QUERY_ERROR: {
    httpStatus: 500,
    message: "MongoDB Query Error",
  },
  USER_DNE: {
    httpStatus: 401,
    message: "E-mail or Password incorrect!",
  },
  FORBIDDEN: {
    httpStatus: 403,
    message: "Action Forbidden.",
  },
  INVALID_BENEFICIARY: {
    httpStatus: 400,
    message: "Beneficiary Secret Code Invalid!",
  },
  INVALID_OTP: {
    httpStatus: 400,
    message: "Invalid OTP.",
  },
  INVALID_BENEFICIARY_UPDATE: {
    httpStatus: 409,
    message: "Beneficiary Does Not Exist / Already Registered.",
  },
  INVALID_VACCINATION_UPDATE: {
    httpStatus: 409,
    message:
      "Beneficiary Does Not Exist / Not Registered / Already Vaccinated.",
  },
};
