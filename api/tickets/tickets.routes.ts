import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../middlewares/validate-query";
import { getTicketRequest, getTicketRequestSchema } from "./tickets.schema";
import { getTickets } from "./tickets.service";

const router = Router();

const handleGetTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, vaccinated, rev } = req.query as getTicketRequest;
    const beneficiaries = await getTickets(date, vaccinated, rev);
    res.json({
      success: true,
      tickets: beneficiaries,
    });
  } catch (err) {
    next(err);
  }
};

router.get(
  "/get",
  validateQuery("query", getTicketRequestSchema),
  handleGetTickets
);

export default router;
