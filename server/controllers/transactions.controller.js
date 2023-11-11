import { db } from '../models/index.js';

const Transaction = db.transactions;

export const createTransaction = (req, res) => {

  if (!req.body.benefit) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const transactionParams = {
    benefit: req.body.benefit,
    businessName: req.body.businessName,
    clientName: req.body.clientName
  };

  Transaction.create(transactionParams)
    .then(data => {
      res.send({
        transaction: data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });

};

export const listTransactions = (req, res) => {

  Transaction.findAll({})
    .then(data => {
      res.send({
        transactions: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};

export const updateTransaction = (req, res) => {
  const id = req.params.id;

  Transaction.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Transaction was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Transaction with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Transaction with id=" + id
      });
    });

};

export const deleteTransaction = (req, res) => {
  const id = req.params.id;

  Transaction.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Transaction was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Transaction with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id
      });
    });
};
