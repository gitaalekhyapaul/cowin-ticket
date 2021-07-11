import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

const handleValidateOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(200)
      .json({ success: true, beneficiaryId: "abcd-abcd-abcd-abcd-abcd" });
  } catch (err) {
    next(err);
  }
};

router.post("/otp", handleValidateOtp);

export default router;
