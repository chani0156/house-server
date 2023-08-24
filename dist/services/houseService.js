"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHouse = exports.getHouseById = exports.createHouse = void 0;
const House_1 = __importDefault(require("../models/House"));
const RISK_THRESHOLD = 0.5;
const RISK_INCREASE = 1.1;
const MAX_RISK = 1;
const calculateRisk = (loanAmount, currentValue) => {
    let risk = loanAmount / currentValue;
    if (risk > RISK_THRESHOLD) {
        risk *= RISK_INCREASE;
    }
    return Math.min(risk, MAX_RISK);
};
const createHouse = (address, currentValue, loanAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const risk = calculateRisk(loanAmount, currentValue);
    return House_1.default.create({ address, currentValue, loanAmount, risk });
});
exports.createHouse = createHouse;
const getHouseById = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    return House_1.default.findByPk(houseId);
});
exports.getHouseById = getHouseById;
const updateHouse = (houseId, address, currentValue, loanAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const risk = calculateRisk(loanAmount, currentValue);
    const house = yield House_1.default.findByPk(houseId);
    if (!house) {
        return null; // Handle not found scenario accordingly
    }
    yield house.update({ address, currentValue, loanAmount, risk });
    return house;
});
exports.updateHouse = updateHouse;
