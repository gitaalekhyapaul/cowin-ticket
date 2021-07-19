import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../middlewares/validate-query";
import {
  updateBeneficiaryRequest,
  updateBeneficiaryRequestSchema,
} from "./update.schema";

import { updateBeneficiary } from "./update.service";

const router = Router();

const handlePostUpdateBeneficiary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, beneficiaryId } = req.body as updateBeneficiaryRequest;
    const updatedId = await updateBeneficiary(id, beneficiaryId);
    res.status(201).json({
      success: true,
      updatedId,
    });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/beneficiary",
  validateQuery("body", updateBeneficiaryRequestSchema),
  handlePostUpdateBeneficiary
);

export default router;
