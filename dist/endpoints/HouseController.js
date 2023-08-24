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
const createHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { address, currentValue, loanAmount } = req.body;
        if (!loanAmount)
            loanAmount = 0;
        // Calculate risk
        let risk = loanAmount / currentValue;
        if (risk > 0.5) {
            risk += 0.1;
        }
        const newHouse = yield House_1.default.create({ address, currentValue, loanAmount, risk });
        res.status(201).json(newHouse);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.createHouse = createHouse;
const getHouseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseId = parseInt(req.params.id, 10);
        const house = yield House_1.default.findByPk(houseId);
        if (!house) {
            res.status(404).json({ message: 'House not found' });
        }
        else {
            res.json(house);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.getHouseById = getHouseById;
const updateHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseId = parseInt(req.params.id, 10);
        const { address, currentValue, loanAmount } = req.body;
        let risk = loanAmount / currentValue;
        if (risk > 0.5) {
            risk += 0.1;
        }
        const house = yield House_1.default.findByPk(houseId);
        if (!house) {
            res.status(404).json({ message: 'House not found' });
        }
        else {
            yield house.update({ address, currentValue, loanAmount, risk });
            res.json(house);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.updateHouse = updateHouse;
