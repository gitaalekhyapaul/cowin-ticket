import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../middlewares/validate-query";
import {
  validateOTPRequest,
  validateOTPRequestSchema,
} from "./validate.schema";

import { validateOtp, validateBeneficiary } from "./validate.service";

const router: Router = Router();

const handleValidateOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, otp, txnId } = req.body as validateOTPRequest;
    const { beneficiaryId } = await validateOtp(otp, txnId);
    const success = await validateBeneficiary(`${beneficiaryId}`, code);
    res.status(200).json({
      success,
      beneficiaryId,
    });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/otp",
  validateQuery("body", validateOTPRequestSchema),
  handleValidateOtp
);

export default router;
