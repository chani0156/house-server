import House from '../models/House';

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

export const createHouse = async (address: string, currentValue: number, loanAmount: number) => {
  const risk = calculateRisk(loanAmount, currentValue);
  return House.create({ address, currentValue, loanAmount, risk });
};

export const getHouseById = async (houseId: number) => {
  return House.findByPk(houseId);
};

export const updateHouse = async (houseId: number, address: string, currentValue: number, loanAmount: number) => {
  const risk = calculateRisk(loanAmount, currentValue);
  const house = await House.findByPk(houseId);
  if (!house) {
    return null; 
  }
  await house.update({ address, currentValue, loanAmount, risk });
  return house;
};
