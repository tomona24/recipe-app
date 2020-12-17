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
  if (potionPart.match(/^\D+$/)) {
    data.unit.su = potionPart;
  } else {
    const fractions = potionPart.match(/\d+\/\d+/g);
    if (fractions !== null) {
      const denominator = [];
      const itemPotion = [];
      fractions.forEach((frac) => {
        const numeratorAndDenominator = frac.split(/\//g);
        itemPotion.push(Number(numeratorAndDenominator[0]));
        denominator.push(numeratorAndDenominator[1]);
      });
      data.potion = itemPotion;
      data.unit.denominator = denominator;
    } else {
      data.potion = potionPart.match(/\d+/g).map((num) => {
        return Number(num);
      });
      data.unit.denominator = data.potion.map((item) => {
        return '';
      });
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

export const ingredientsConverter = {
  fromStringToObj: (userInput) => {
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
  },
  createPotion: (potion, unit) => {
    const strArr = [];
    strArr.push(unit.pre);
    if (potion.length > 0) {
      const potionStrArr = [];
      potion.forEach((pNum, index) => {
        const str =
          unit.denominator[index] === ''
            ? pNum
            : `${pNum}/${unit.denominator[index]}`;
        potionStrArr.push(str);
      });
      strArr.push(potionStrArr.join('~'));
    }
    strArr.push(unit.su);
    return strArr.join('');
  },
  createOneIngStr: (ingredient) => {
    const { name, potion, unit } = ingredient;

    const createPotion = (p, u) => {
      const strArr = [];
      strArr.push(u.pre);
      if (p.length > 0) {
        const potionStrArr = [];
        p.forEach((pNum, index) => {
          const str =
            u.denominator[index] === ''
              ? pNum
              : `${pNum}/${u.denominator[index]}`;
          potionStrArr.push(str);
        });
        strArr.push(potionStrArr.join('~'));
      }
      strArr.push(u.su);
      return strArr.join('');
    };

    return `${name} ${createPotion(potion, unit)}`;
  },
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
