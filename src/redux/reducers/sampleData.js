export const CATEGORY = {
  SOUP: 'Soup',
  SIDE_MEAL: 'Side meal',
  SINGLE_DISH: 'Single dish',
};

export const data1 = {
  id: 1,
  title: 'Curry',
  createDate: 20201015,
  updateDate: 20201130,
  picture: 'gohan.jpg',
  category: CATEGORY.SINGLE_DISH,
  flow: {
    1: {
      instruction: 1,
      ingredients: [1, 2],
    },
    2: {
      instruction: 2,
      ingredients: [],
    },
    3: {
      instruction: 3,
      ingredients: [3],
    },
  },
  instructions: {
    1: {
      id: 1,
      order: 1,
      how: 'Cut vesitables into small pieces',
    },
    2: {
      id: 1,
      order: 1,
      direction: 'Put them into the suitable pod',
    },
    3: {
      id: 1,
      order: 1,
      direction: 'Boil the pod for 30 minutes',
    },
    4: {
      id: 1,
      order: 1,
      direction: 'Add soy source after stopping boiling',
    },
  },
  ingredients: {
    1: {
      id: 1,
      name: 'Carrot',
      potion: 1,
      unit: '本',
    },
    2: {
      id: 2,
      name: 'Potato',
      potion: 2,
      unit: '個',
    },
    3: {
      id: 3,
      name: 'Soy source',
      potion: 30,
      unit: 'ml',
    },
  },
  potion: 2,
  review: {
    star: 3.5,
    memo: '評価のメモ',
  },
  quoted:
    'https://cookpad.com/uk/recipes/14134905-carrot-sweet-pickle-chundo?via=search&search_term=carrot',
};

export const data2 = {
  id: 2,
  title: 'Sarada',
  createDate: 20201015,
  updateDate: 20201130,
  picture: 'gohan.jpg',
  category: CATEGORY.SIDE_MEAL,
  tags: {},
  flow: {
    1: {
      instruction: 1,
      ingredients: [1, 2],
    },
    2: {
      instruction: 2,
      ingredients: [],
    },
    3: {
      instruction: 3,
      ingredients: [3],
    },
  },
  instructions: {
    1: {
      id: 1,
      order: 1,
      how: 'Cut vesitables into small pieces',
    },
    2: {
      id: 1,
      order: 1,
      direction: 'Put them into the suitable pod',
    },
    3: {
      id: 1,
      order: 1,
      direction: 'Boil the pod for 30 minutes',
    },
    4: {
      id: 1,
      order: 1,
      direction: 'Add soy source after stopping boiling',
    },
  },
  ingredients: {
    1: {
      id: 1,
      name: 'Carrot',
      potion: 1,
      unit: '本',
    },
    2: {
      id: 2,
      name: 'Potato',
      potion: 2,
      unit: '個',
    },
    3: {
      id: 3,
      name: 'Soy source',
      potion: 30,
      unit: 'ml',
    },
  },
  potion: 2,
  review: {
    star: 3.5,
    memo: '評価のメモ',
  },
  quoted:
    'https://cookpad.com/uk/recipes/14134905-carrot-sweet-pickle-chundo?via=search&search_term=carrot',
};

export const data3 = {
  id: 3,
  title: 'Miso soupe',
  createDate: 20201015,
  updateDate: 20201130,
  picture: 'gohan.jpg',
  category: CATEGORY.SOUP,
  tags: [],
  flow: {
    1: {
      instruction: 1,
      ingredients: [1, 2],
    },
    2: {
      instruction: 2,
      ingredients: [],
    },
    3: {
      instruction: 3,
      ingredients: [3],
    },
  },
  instructions: {
    1: {
      id: 1,
      order: 1,
      how: 'Cut vesitables into small pieces',
    },
    2: {
      id: 1,
      order: 1,
      how: 'Put them into the suitable pod',
    },
    3: {
      id: 1,
      order: 1,
      how: 'Boil the pod for 30 minutes',
    },
    4: {
      id: 1,
      order: 1,
      how: 'Add soy source after stopping boiling',
    },
  },
  ingredients: {
    1: {
      id: 1,
      name: 'Carrot',
      potion: 1,
      unit: '本',
    },
    2: {
      id: 2,
      name: 'Potato',
      potion: 2,
      unit: '個',
    },
    3: {
      id: 3,
      name: 'Soy source',
      potion: 30,
      unit: 'ml',
    },
  },
  potion: 2,
  review: {
    star: 3.5,
    memo: '評価のメモ',
  },
  quoted:
    'https://cookpad.com/uk/recipes/14134905-carrot-sweet-pickle-chundo?via=search&search_term=carrot',
};
