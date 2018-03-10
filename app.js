const getRentalStatement = require("./rental_calculator");

let customer = {
  name: "martin",
  rentals: [
    { movieID: "F001", days: 3 },
    { movieID: "F002", days: 1 },
    { movieID: "F003", days: 3 }
  ]
};

let movies = {
  F001: { title: "Ran", code: "regular" },
  F002: { title: "Trois Couleurs: Bleu", code: "regular" },
  F003: { title: "Ah Boys To Men", code: "new" }
};

/* eslint-disable no-console */
console.log(getRentalStatement(customer, movies));
