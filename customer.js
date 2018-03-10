class Customer {
  constructor({ name, rentals }) {
    this.name = name;
    this.rentals = rentals;
    this.frequentRenterPoints = 0;
  }

  incrementRentalPoints() {
    this.frequentRenterPoints++;
  }
}

module.exports = Customer;
