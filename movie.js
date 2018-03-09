import { mod } from "../Library/Caches/typescript/2.6/node_modules/@types/prelude-ls";

class Movie {
  constructor({ id, title, code }) {
    this.id = id;
    this.title = title;
    this.code = code;
  }
}
class NewMovie extends Movie {
  constructor({id,title}){
    super({id,title,code:"new"});
  }

  getBillForRental(days){
    return days * 3;
  }
}

class RegularMovie extends Movie {
  constructor({id,title}){
    super({id,title,code:"regular"});
  }

  getBillForRental(days){
    let bill = 2;
        if (days > 2) {
          bill += (days - 2) * 1.5;
  }
  return bill;
}

class ChildrenMovie extends Movie {
  constructor({id,title}){
    super({id,title,code:"children"})
  }

  getBillForRental(days){
    let bill = 3;
    if (days > 3){
      bill += (days -3) * 1.5
    }
  }
}


module.exports = {
  Movie,
  NewMovie,
  RegularMovie,
  ChildrenMovie
}
