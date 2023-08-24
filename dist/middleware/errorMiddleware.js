"use strict";
// src/middleware/errorHandlers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInternalServerError = exports.handleNotFoundError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}
exports.CustomError = CustomError;
const handleNotFoundError = (req, res, next) => {
    const error = new CustomError(404, 'Not Found');
    next(error);
};
exports.handleNotFoundError = handleNotFoundError;
const handleInternalServerError = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err instanceof CustomError ? err.status : 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message,
    });
};
exports.handleInternalServerError = handleInternalServerError;
