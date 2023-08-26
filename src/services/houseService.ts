import House from '../models/House';

// Constants for risk calculation
const RISK_THRESHOLD = 0.5;
const RISK_INCREASE = 1.1;
const MAX_RISK = 1;

const calculateRisk = (loanAmount: number, currentValue: number): number => {
  let risk = loanAmount / currentValue;
  if (risk > RISK_THRESHOLD) {
    risk *= RISK_INCREASE;
  }
  return Math.min(risk, MAX_RISK);
};

//Create a new house record
export const createHouse = async (address: string, currentValue: number, loanAmount: number) => {
  const risk = calculateRisk(loanAmount, currentValue);
  return House.create({ address, currentValue, loanAmount, risk });
};

//Retrieve a house by its ID.
export const getHouseById = async (houseId: number) => {
  return House.findByPk(houseId);
};

//Update house details
export const updateHouse = async (houseId: number, address: string, currentValue: number, loanAmount: number) => {
  const house = await House.findByPk(houseId);
  if (!house) {
    return null; 
  }

  // Check if currentValue or loanAmount is updated
  if (currentValue !== house.currentValue || loanAmount !== house.loanAmount) {
    // Recalculate risk based on updated values
    const newRisk = calculateRisk(loanAmount, currentValue);
    await house.update({ address, currentValue, loanAmount, risk: newRisk });
  } else {
    // If neither currentValue nor loanAmount is updated, only update the address
    await house.update({ address });
  }

  return house;
};
