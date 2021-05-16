import express from "express";
import HttpException from "../exceptions";

export type ErrorRequestHandler = (err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => any;