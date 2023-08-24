"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class House extends sequelize_1.Model {
}
House.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.FLOAT,
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
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    risk: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: 'houses',
    sequelize: database_1.sequelize,
});
exports.default = House;
