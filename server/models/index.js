import { Sequelize } from 'sequelize';
import { STRING } from 'sequelize/lib/data-types';
import dotenv from 'dotenv';

dotenv.config();

const Transaction = (sequelize) => {
  return sequelize.define("transaction", {
    benefit: {
      type: STRING
    },
    businessName: {
      type: STRING
    },
    clientName: {
      type: STRING
    },
  })
};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const dbConnector = {};

dbConnector.sequelize = sequelize;
dbConnector.transactions = Transaction(sequelize)
export const db = dbConnector;
