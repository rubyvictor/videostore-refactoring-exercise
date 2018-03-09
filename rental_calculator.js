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

  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of rentals) {
    let rentalCost = rental.getCost();
    //print figures for this rental
    result += `\t${rental.movie.title}\t${rentalCost}\n`;
  }

  let frequentRenterPoints = 0;
  for (let rental of rentals) {
    //add frequent renter points
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if (rental.movie.code === "new" && rental.days > 2) frequentRenterPoints++;
  }

  let totalCost = 0;
  for (let rental of rentals) {
    let rentalCost = rental.getCost();
    totalCost += rentalCost;
  }

  // add footer lines
  result += `Amount owed is ${totalCost}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
};
