const Customer = require("./customer");
const Rental = require("./rental");
const Movie = require("./movie");

function createMovie(rental, movies) {
  return new Movie({
    id: rental.movieID,
    title: movies[rental.movieID].title,
    code: movies[rental.movieID].code
  });
}

module.exports = function statement(customerRecord, movies) {
  let customer = new Customer({ name: customerRecord.name });

  let rentals = customerRecord.rentals.map(
    rental =>
      new Rental({
        movie: createMovie(rental, movies),
        days: rental.days
      })
  );

  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of rentals) {
    let movie = rental.movie;
    let thisAmount = 0;

    // determine amount for each movie
    switch (movie.code) {
      case "regular":
        thisAmount = 2;
        if (rental.days > 2) {
          thisAmount += (rental.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = rental.days * 3;
        break;
      case "children":
        thisAmount = 1.5;
        if (rental.days > 3) {
          thisAmount += (rental.days - 3) * 1.5;
        }
        break;
      default:
        throw new Error("Invalid move type:" + movie.code);
    }

    //add frequent renter points
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if (movie.code === "new" && rental.days > 2) frequentRenterPoints++;

    //print figures for this rental
    result += `\t${movie.title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
};
