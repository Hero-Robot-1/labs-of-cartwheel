import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/db.config.js';
import { STRING } from 'sequelize/lib/data-types';
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

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const dbConnector = {};

dbConnector.sequelize = sequelize;
dbConnector.transactions = Transaction(sequelize)
export const db = dbConnector;
