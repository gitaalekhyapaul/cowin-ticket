import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../middlewares/validate-query";
import {
  updateBeneficiaryRequest,
  updateBeneficiaryRequestSchema,
  updateVaccinationRequest,
  updateVaccinationRequestSchema,
} from "./update.schema";

import { updateBeneficiary, updateVaccination } from "./update.service";

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

const handlePostUpdateVaccination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, batchNumber, remarks, sideEffects } =
      req.body as updateVaccinationRequest;
    const updatedId = await updateVaccination({
      id,
      batchNumber,
      sideEffects,
      remarks,
    });
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

router.post(
  "/vaccination",
  validateQuery("body", updateVaccinationRequestSchema),
  handlePostUpdateVaccination
);

export default router;
