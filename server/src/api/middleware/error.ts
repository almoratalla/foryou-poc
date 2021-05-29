import { ErrorRequestHandler } from "../../utils/types";
import { ApiError } from "../../utils/handlers/error";


const errorMiddleware : ErrorRequestHandler = (err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
     let environment = 'development';
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    if (err instanceof ApiError){
      return next(err)
    }
    res.status(err.status || 500);
    if (environment === 'development') {
      res.json({
        errors: {
          message: err.message,
          code: err?.code || err?.original.code || '',
          stack: err.stack
        },
      });
    } else {
      res.json({
        errors: {
          message: err.message,
          code: err?.original.code || err?.code || '',
        },
      });
    }
}

export default errorMiddleware;