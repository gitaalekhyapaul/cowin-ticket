import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../middlewares/validate-query";
import { validateJwt } from "../middlewares/validate-jwt";
import {
  adminLogin,
  adminLoginSchema,
  adminRegister,
  adminRegisterSchema,
  userInfo,
  getReports,
  getReportsSchema,
} from "./admin.schema";
import {
  loginAdmin,
  registerAdmin,
  getReportArray,
  getCSV,
} from "./admin.service";
import { errors } from "../error/error.constants";

const router = Router();

const handlePostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as adminLogin;
    const authToken = await loginAdmin(username, password);
    res.json({
      success: true,
      authToken,
    });
  } catch (err) {
    next(err);
  }
};

const handlePostRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { webhook, username, password } = req.body as adminRegister;
    const id = await registerAdmin(webhook, username, password);
    res.status(201).json({
      success: true,
      id,
    });
  } catch (err) {
    next(err);
  }
};

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if ((res.locals as userInfo).user) {
      if ((res.locals.user as userInfo).user === "admin") {
        next();
      } else {
        throw errors.FORBIDDEN;
      }
    } else {
      throw errors.FORBIDDEN;
    }
  } catch (err) {
    next(err);
  }
};

const handleGetReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query as getReports;
    const reportArray = await getReportArray(date);
    const csv = await getCSV(reportArray);
    res.set({
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=reports.csv",
      "x-filename": "reports.csv",
    });
    res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
};

router.get(
  "/reports",
  validateJwt(),
  checkAdmin,
  validateQuery("query", getReportsSchema),
  handleGetReports
);
router.post("/login", validateQuery("body", adminLoginSchema), handlePostLogin);

if (process.env.NODE_ENV !== "production") {
  router.post(
    "/register",
    validateQuery("body", adminRegisterSchema),
    handlePostRegister
  );
}

export default router;
