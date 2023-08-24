import { Request, Response } from 'express';
import * as HouseService from '../services/houseService';

export const createHouse = async (req: Request, res: Response) => {
  try {
    const { address, currentValue, loanAmount } = req.body;
    const newHouse = await HouseService.createHouse(address, currentValue, loanAmount);
    res.status(201).json(newHouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

export const getHouseById = async (req: Request, res: Response) => {
  try {
    const houseId = +req.params.id;
    const house = await HouseService.getHouseById(houseId);
    if (!house) {
      res.status(404).json({ message: 'House not found' });
    } else {
      res.json(house);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

export const updateHouse = async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
