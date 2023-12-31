import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import _ from "lodash"
import httpStatus from "http-status";
import ApiError from "../library/api.error.library";

const validateMiddleware =
    (schema:any) =>
        (req: Request, _res: Response, next: NextFunction): void => {            
            const validSchema = _.pick(schema, ["params", "query", "body"]);
            const object = _.pick(req, Object.keys(validSchema));


            const { value, error } = Joi.compile(validSchema)
                .prefs({ errors: { label: "key" } })
                .validate(object);

            if (error) {
                const errorMessage = error.details
                    .map((details) => details.message)
                    .join(", ");
                return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
            }

            Object.assign(req, value);
            return next();
        };

export default validateMiddleware;