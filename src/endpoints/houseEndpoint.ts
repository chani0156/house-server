import { NextFunction, Request, Response } from 'express';
import * as HouseService from '../services/houseService';

//Create a new house record
export const createHouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address, currentValue, loanAmount } = req.body;
    const newHouse = await HouseService.createHouse(address, currentValue, loanAmount);
    res.status(201).json(newHouse);
  } catch (error) {
    next(error);  }
};

//Retrieve a house by its ID.
export const getHouseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const houseId = +req.params.id;
    const house = await HouseService.getHouseById(houseId);
    if (!house) {
      res.status(404).json({ message: 'House not found' });
    } else {
      res.json(house);
    }
  } catch (error) {
    next(error);
  }
};

//Update house details
export const updateHouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const houseId = +req.params.id;
    const { address, currentValue, loanAmount } = req.body;
    const updatedHouse = await HouseService.updateHouse(houseId, address, currentValue, loanAmount);
    if (!updatedHouse) {
      res.status(404).json({ message: 'House not found' });
    } else {
      res.json(updatedHouse);
    }
  } catch (error) {
    next(error);
  }
};
