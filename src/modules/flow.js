class Flow {
  constructor() {
    this.flow = [];
  }

  addInstruction(instruction) {
    this.flow = [...this.flow, instruction];
  }

  changeAllStruction(instructions) {
    this.flow = instructions;
  }
}

export default Flow;
