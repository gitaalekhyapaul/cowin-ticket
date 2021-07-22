import { Router, Request, Response, NextFunction } from "express";

import { validateJwt } from "../middlewares/validate-jwt";
import validateQuery from "../middlewares/validate-query";
import {
  validateOTPRequest,
  validateOTPRequestSchema,
  validateBeneficiaryRequest,
  validateBeneficiaryRequestSchema,
} from "./validate.schema";

import {
  validateOtp,
  validateBeneficiary,
  generateTicket,
  addBeneficiary,
} from "./validate.service";

const router: Router = Router();

const handleValidateOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, otp, txnId } = req.body as validateOTPRequest;
    const { beneficiaryId } = await validateOtp(code, otp, txnId);
    const success = await validateBeneficiary(`${beneficiaryId}`, code);
    res.status(200).json({
      success,
      beneficiaryId,
    });
  } catch (err) {
    next(err);
  }
};

const handleValidateBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const beneficiary = req.body as validateBeneficiaryRequest;
    const token = await addBeneficiary(beneficiary);
    const ticketData = await generateTicket(token, beneficiary);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=ticket.pdf",
      "x-filename": "ticket.pdf",
    });
    res.status(200).send(ticketData);
  } catch (err) {
    next(err);
  }
};

router.post(
  "/otp",
  validateJwt(),
  validateQuery("body", validateOTPRequestSchema),
  handleValidateOtp
);
router.post(
  "/beneficiary",
  validateJwt(),
  validateQuery("body", validateBeneficiaryRequestSchema),
  handleValidateBeneficiary
);

export default router;
