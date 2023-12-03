import { db } from "../models/index.js";

const UserEmails = db.userEmails;

export const createUserEmails = (req, res) => {
    const { userid, email, timestamp } = req.body;

  if (!userid || !email || !timestamp) {
    res.status(400).send({
      message: "Incomplete data!",
    });
    return;
  }

  const UserEmailsParams = {
    email: req.body.email,
    userid: req.body.userid,
    timestamp: req.body.timestamp,
    
  };
console.log( "user enmail create");
  UserEmails.create(UserEmailsParams)
    .then((data) => {
      res.send({
        userEmails: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: (err.message, "opps "),
      });
    });
};

export const listUserEmails = (req, res) => {
    UserEmails.findAll({})
    .then((data) => {
      console.log(data);
      res.send({
        userEmails: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:  (err.message, "opps cant list user emails"),
      });
    });
};


