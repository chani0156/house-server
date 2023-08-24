"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error!' });
};
exports.default = errorMiddleware;
