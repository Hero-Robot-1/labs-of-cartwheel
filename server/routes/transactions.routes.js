import * as transactions from '../controllers/transactions.controller.js';
import express from 'express';

export const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({ message: "Hello from server :)" } );
});
routes.get("/transactions", transactions.listTransactions);

routes.post("/transactions", transactions.createTransaction);

routes.delete("/transactions/:id", transactions.deleteTransaction);

routes.put("/transactions/:id", transactions.updateTransaction);


