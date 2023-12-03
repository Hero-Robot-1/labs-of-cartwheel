import { Sequelize } from "sequelize";
import { STRING } from "sequelize/lib/data-types";
import dotenv from "dotenv";

dotenv.config();

const Transaction = (sequelize) => {
  return sequelize.define("transaction", {
    tokenId:{
      type: STRING
    },
    cost: {
      type: STRING,
    },
    benefit: {
      type: STRING,
    },
    businessName: {
      type: STRING,
    },
    timestamp: {
      type: STRING,
    },
  });
};

const BuisnessBenefits = (sequelize) => {
  return sequelize.define("buisnessBenefits", {
    clubName: {
      type: STRING,
    },
    businessName: {
      type: STRING,
    },
    benefit: {
      type: STRING,
    },
    timestamp: {
      type: STRING,
    }
  });
};

const UserEmails = (sequelize) => {
  return sequelize.define("userEmails", {
    email: {
      type: STRING,
    },
    userid: {
      type: STRING,
    },
    timestamp: {
      type: STRING,
    }
  });
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const dbConnector = {};

dbConnector.sequelize = sequelize;
dbConnector.transactions = Transaction(sequelize);
dbConnector.buisnessBenefits = BuisnessBenefits(sequelize);
dbConnector.userEmails = UserEmails(sequelize);

export const db = dbConnector;
