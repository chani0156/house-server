// src/middleware/errorHandlers.ts

import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

const handleNotFoundError = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(404, 'Not Found');
  next(error);
};

const handleInternalServerError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err instanceof CustomError ? err.status : 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message,
  });
};

export { CustomError, handleNotFoundError, handleInternalServerError };
