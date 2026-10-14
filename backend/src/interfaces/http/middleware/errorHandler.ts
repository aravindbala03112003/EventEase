import { Request, Response, NextFunction } from "express";
import { ErrorPresenter } from "../../presenters/ErrorPresenter";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const { status, body } = ErrorPresenter.toHttp(err);
  res.status(status).json(body);
}
