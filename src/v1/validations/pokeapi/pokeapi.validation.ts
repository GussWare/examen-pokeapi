import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiError from "../../../includes/library/api.error.library";

// Middleware para validar los datos de entrada
export const makePDF = async (req: Request, _res: Response, next: NextFunction) => {
  const Schema = Joi.object({
    name: Joi.string().required()
  });

  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (err) {
    //@ts-ignore
    next(new ApiError(httpStatus.BAD_REQUEST, err.details[0].message));
  }
}
