"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const cors = require('cors');
const app = (0, express_1.default)();
//CONFIGURATION
const corsOptions = {
    origin: 'http://localhost:3001',
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.use(errorMiddleware_1.handleNotFoundError);
app.use(errorMiddleware_1.handleInternalServerError);
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
database_1.sequelize
    .sync()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
