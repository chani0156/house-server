// src/models/House.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class House extends Model {
  public id!: number;
  public address!: string;
  public currentValue!: number;
  public loanAmount?: number;
  public risk?: number;
}

House.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Address is required.',
          },
          notEmpty: {
            msg: 'Address cannot be empty.',
          },
        },
      },
      currentValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Current Value is required.',
          },
          min: {
            args: [0],
            msg: 'Current Value must be a positive number.',
          },
        },
      },
      loanAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    risk: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: 'houses',
    sequelize,
  }
);

export default House;