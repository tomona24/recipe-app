class Instruction {
  constructor(order, how, ingredients) {
    this.order = order;
    this.how = how;
    this.ingredients = ingredients.length > 0 ? ingredients : [];
  }
}

export default Instruction;
