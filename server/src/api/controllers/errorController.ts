import { Request, Response, NextFunction } from 'express';
import { ApiError, InternalError } from "../../utils/handlers/error"
import { ErrorRequestHandler } from "../../utils/types";

const get404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('404');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = ( err: Error,req: Request, res: Response, next: NextFunction) => {
    let environment = 'development';
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (environment === 'development') {
            return res.status(500).json({message: err.message, stack: err});
        }
        ApiError.handle(new InternalError(), res);
    }
}

export { get404, errorHandler };