import * as transactions from '../controllers/transactions.controller.js';
import * as buisnessBenefits from '../controllers/buisnessBenefits.controller.js';

import express from 'express';

export const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({ message: "Hello from server :)" } );
});
routes.get("/transactions", transactions.listTransactions);

routes.post("/transactions", transactions.createTransaction);

routes.delete("/transactions/:id", transactions.deleteTransaction);

routes.put("/transactions/:id", transactions.updateTransaction);

// buisnessBenefits
routes.get("/buisnessBenefits", buisnessBenefits.listBuisnessBenefits);

routes.post("/buisnessBenefits", buisnessBenefits.createBuisnessBenefits);

routes.delete("/buisnessBenefits/:id", buisnessBenefits.deleteBuisnessBenefits);

routes.put("/buisnessBenefits/:id", buisnessBenefits.updateBuisnessBenefits);


