"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const houseEndpoint_1 = require("../endpoints/houseEndpoint");
const router = express_1.default.Router();
router.post('/houses', houseEndpoint_1.createHouse);
router.get('/houses/:id', houseEndpoint_1.getHouseById);
router.put('/houses/:id', houseEndpoint_1.updateHouse);
exports.default = router;
