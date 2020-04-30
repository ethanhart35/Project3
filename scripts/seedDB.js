const mongoose = require("mongoose");
const db = require("../models");

// This file empties the seeds and reinserts seeds

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/fauxfinancedata"
);

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const userSeed = [
  {
    name: "Tom Nook",
    email: "Tom.Nook@gmail.com",
    password: "BellCollector",
    stockData: [
      {
        name: "IBM",
        quantity: "50",
        purchaseValue: "100",
      },
    ]
  },
]