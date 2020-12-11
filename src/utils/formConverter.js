const ingredientsConvertHelper = (line) => {
  const regexp = /\D+[\s\t].+/g;
  const array = line.match(regexp) ? line.match(regexp) : [];
  return array.length === 1;
};

const ingredientItemConverter = (line, index) => {
  const itemArr = line.split(/[\s\t]/).filter((str) => str !== '');
  const name = itemArr[0];
  const potionPart = itemArr[1];
  const data = {
    id: index,
    name,
    potion: [], // veiw: '2~5'
    unit: {
      pre: '',
      denominator: [], // view:'/5' or '/5~ /5'
      su: '',
    },
  };
  // not contain num
  if (potionPart.match(/\D/)) {
    data.unit.su = potionPart;
  } else {
    const fractions = potionPart.match(/\d+\/\d+/g);
    if (fractions.length !== null) {
      fractions.forEach((frac) => {
        const numeratorAndDenominator = frac.split(/\//g);
        data.potion = [...data.potion, numeratorAndDenominator[0]];
        data.unit.donominator = [
          ...data.unit.donominator,
          numeratorAndDenominator[1],
        ];
      });
    } else {
      data.potion = potionPart.match(/\d+/g);
    }
    data.unit.pre = potionPart.match(/^\D+/g)
      ? potionPart.match(/^\D+/g)[0]
      : '';
    data.unit.su = potionPart.match(/\D+$/g)
      ? potionPart.match(/\D+$/g)[0]
      : '';
  }
  return data;
};

export const ingredientsConverter = (userInput) => {
  const newIngredients = {};
  const regexp = /\n/g;
  const items = userInput.split(regexp)
    ? userInput.split(regexp).filter((item) => item !== '')
    : [userInput];
  items.forEach((item, index) => {
    const newItem = ingredientItemConverter(item, index);
    newIngredients[index] = newItem;
  });
  return newIngredients;
};

export const instructionsConverter = (userInput) => {
  const regexp = /\n/g;
  const items = userInput.split(regexp)
    ? userInput.split(regexp).filter((item) => item !== '')
    : [userInput];
  const instructions = items.map((instruction, index) => {
    return {
      id: index + 1,
      order: index + 1,
      direction: instruction,
      ingredients: [],
    };
  });
  return instructions;
};
