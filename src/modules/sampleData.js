export const CATEGORY = {
  SOUP: 'Soup',
  SIDE_MEAL: 'Side meal',
  SINGLE_DISH: 'Single dish',
};

export const data1 = {
  id: 1,
  title: 'Curry',
  cookingTime: '15min',
  createdDate: 20201015,
  updatedDate: 20201130,
  picture: ['gohan.jpg'],
  category: [CATEGORY.SINGLE_DISH],
  instructions: [
    {
      id: 1,
      order: 1,
      direction: 'Cut vesitables into small pieces',
      ingredients: [],
    },
    {
      id: 2,
      order: 2,
      direction: 'Put them into the suitable pod',
      ingredients: [],
    },
    {
      id: 3,
      order: 3,
      direction: 'Boil the pod for 30 minutes',
      ingredients: [],
    },
    {
      id: 4,
      order: 4,
      direction: 'Add soy source after stopping boiling',
      ingredients: [3],
    },
  ],
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
  isPublic: false,
  yeild: 2,
  star: 3,
  memo: '評価のメモ',
  quoted: [
    'https://cookpad.com/uk/recipes/14134905-carrot-sweet-pickle-chundo?via=search&search_term=carrot',
  ],
};

export const data2 = {
  id: 2,
  title: 'Sarada',
  createdDate: 20201015,
  updatedDate: 20201130,
  picture: ['gohan.jpg'],
  category: [CATEGORY.SINGLE_DISH],
  instructions: {
    1: {
      id: 1,
      order: 1,
      how: 'Cut vesitables into small pieces',
      ingredients: [],
    },
    2: {
      id: 1,
      order: 1,
      direction: 'Put them into the suitable pod',
      ingredients: [],
    },
    3: {
      id: 1,
      order: 1,
      direction: 'Boil the pod for 30 minutes',
      ingredients: [],
    },
    4: {
      id: 1,
      order: 1,
      direction: 'Add soy source after stopping boiling',
      ingredients: [],
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
  isPublic: false,
  yeild: 2,
  review: {
    star: 3.5,
    memo: '評価のメモ',
  },
  quoted: [
    'https://cookpad.com/uk/recipes/14134905-carrot-sweet-pickle-chundo?via=search&search_term=carrot',
  ],
  cookingTime: '15min',
};

export const data3 = {
  id: 3,
  title: 'Sarada',
  createdDate: 20201015,
  updatedDate: 20201130,
  picture: ['gohan.jpg'],
  cookingTime: '15min',
  category: [CATEGORY.SINGLE_DISH],
  instructions: {
    1: {
      id: 1,
      order: 1,
      how: 'Cut vesitables into small pieces',
      ingredients: [1, 2],
    },
    2: {
      id: 1,
      order: 1,
      direction: 'Put them into the suitable pod',
      ingredients: [],
    },
    3: {
      id: 1,
      order: 1,
      direction: 'Boil the pod for 30 minutes',
      ingredients: [],
    },
    4: {
      id: 1,
      order: 1,
      direction: 'Add soy source after stopping boiling',
      ingredients: [3],
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
  isPublic: false,
  yeild: 2,
  review: {
    star: 3.5,
    memo: '評価のメモ',
  },
  quoted: [
    'https://cookpad.com/uk/recipes/14134905-carrot-sweet-pickle-chundo?via=search&search_term=carrot',
  ],
};
