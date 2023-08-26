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
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors = require('cors');
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
//CONFIGURATION
const ORIGIN = process.env.ORIGIN;
const corsOptions = {
    origin: ORIGIN,
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.use(errorMiddleware_1.default);
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
// Use morgan middleware for request logging
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
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
