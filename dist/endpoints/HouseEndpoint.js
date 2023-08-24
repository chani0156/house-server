"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHouse = exports.getHouseById = exports.createHouse = void 0;
const HouseService = __importStar(require("../services/houseService"));
//Create a new house record
const createHouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, currentValue, loanAmount } = req.body;
        const newHouse = yield HouseService.createHouse(address, currentValue, loanAmount);
        res.status(201).json(newHouse);
    }
    catch (error) {
        next(error);
    }
});
exports.createHouse = createHouse;
//Retrieve a house by its ID.
const getHouseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseId = +req.params.id;
        const house = yield HouseService.getHouseById(houseId);
        if (!house) {
            res.status(404).json({ message: 'House not found' });
        }
        else {
            res.json(house);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getHouseById = getHouseById;
//Update house details
const updateHouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseId = +req.params.id;
        const { address, currentValue, loanAmount } = req.body;
        const updatedHouse = yield HouseService.updateHouse(houseId, address, currentValue, loanAmount);
        if (!updatedHouse) {
            res.status(404).json({ message: 'House not found' });
        }
        else {
            res.json(updatedHouse);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateHouse = updateHouse;
