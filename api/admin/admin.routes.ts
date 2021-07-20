import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../middlewares/validate-query";
import {
  adminLogin,
  adminLoginSchema,
  adminRegister,
  adminRegisterSchema,
} from "./admin.schema";
import { loginAdmin, registerAdmin } from "./admin.service";

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

router.post("/login", validateQuery("body", adminLoginSchema), handlePostLogin);

if (process.env.NODE_ENV !== "production") {
  router.post(
    "/register",
    validateQuery("body", adminRegisterSchema),
    handlePostRegister
  );
}

export default router;
