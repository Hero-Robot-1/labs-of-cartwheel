import { db } from "../models/index.js";

const BuisnessBenefits = db.buisnessBenefits;

export const createBuisnessBenefits = (req, res) => {
  if (!req.body.benefit) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const buisnessBenefitsParams = {
    clubName: req.body.clubName,
    businessName: req.body.businessName,
    benefit: req.body.benefit,
    timestamp: req.body.timestamp,
    
  };
console.log( "ggdsfdsgsdfgsd");
  BuisnessBenefits.create(buisnessBenefitsParams)
    .then((data) => {
      res.send({
        buisnessBenefits: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: (err.message, "ttttt"),
      });
    });
};

export const listBuisnessBenefits = (req, res) => {
    BuisnessBenefits.findAll({})
    .then((data) => {
      console.log(data);
      res.send({
        buisnessBenefits: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:  (err.message, "ttyyyyyttt"),
      });
    });
};

export const updateBuisnessBenefits = (req, res) => {
  const id = req.params.id;

  BuisnessBenefits.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BuisnessBenefits was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update BuisnessBenefits with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BuisnessBenefits with id=" + id,
      });
    });
};

export const deleteBuisnessBenefits = (req, res) => {
  const id = req.params.id;

  BuisnessBenefits.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BuisnessBenefits was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete BuisnessBenefits with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BuisnessBenefits with id=" + id,
      });
    });
};
