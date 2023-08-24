// errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Internal Server Error!' });
};

export default errorMiddleware;
