import { Response } from 'express';
import { environment } from '../../config/env';
import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from './response';

enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error', public stack: string = 'stack') {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message, 'AuthFailure', err.stack).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message, 'AccessTokenError', err.stack).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message, 'InternalError', err.stack).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message, 'NotFound', err.stack).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message, 'BadParams', err.stack).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message, 'Forbidden', err.stack).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = 'Invalid Credentials', stack='') {
    super(ErrorType.UNAUTHORIZED, message, stack);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal error', stack='') {
    super(ErrorType.INTERNAL, message, stack);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', stack='') {
    super(ErrorType.BAD_REQUEST, message, stack);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found', stack='') {
    super(ErrorType.NOT_FOUND, message, stack);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied', stack='') {
    super(ErrorType.FORBIDDEN, message, stack);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists", stack='') {
    super(ErrorType.NO_ENTRY, message, stack);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = 'Token is not valid', stack='') {
    super(ErrorType.BAD_TOKEN, message, stack);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message = 'Token is expired', stack ='') {
    super(ErrorType.TOKEN_EXPIRED, message, stack);
  }
}

export class NoDataError extends ApiError {
  constructor(message = 'No data available', stack='') {
    super(ErrorType.NO_DATA, message, stack);
  }
}

export class AccessTokenError extends ApiError {
  constructor(message = 'Invalid access token', stack='') {
    super(ErrorType.ACCESS_TOKEN, message, stack);
  }
}