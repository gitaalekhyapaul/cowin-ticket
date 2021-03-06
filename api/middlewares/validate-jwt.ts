import { verify } from "jsonwebtoken";
import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { errors } from "../error/error.constants";

import { userInfo } from "../admin/admin.schema";

export const JwtRequestSchema = yup
  .object({
    authorization: yup
      .string()
      .trim()
      .min(1, "JWT cannot be null")
      .matches(/^Bearer .+$/, "JWT should be Bearer Token"),
  })
  .required();

type JwtRequest = yup.InferType<typeof JwtRequestSchema>;

export const validateJwt = (checkRequired: boolean = true) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers as JwtRequest;
      if (!authorization) {
        if (!checkRequired) {
          return next();
        } else {
          return next(errors.JWT_ERROR);
        }
      }
      const authToken = authorization.split(" ")[1];
      const payload: userInfo = verify(
        authToken,
        process.env.SECRET_KEY!
      ) as userInfo;
      res.locals.user = {
        ...payload,
      };
      next();
    } catch (err) {
      next({
        httpStatus: 403,
        message: `${err.name}: ${err.message}`,
      });
    }
  };
};
