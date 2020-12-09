const recipeModel = {
  id: null,
  title: '',
  picture: [],
  category: [],
  tags: [],
  instructions: [
    {
      id: '',
      order: '',
      ingredients: [],
    },
  ],
  // instructionsとingredientsと配列を→オブジェクト：IDとオーダー
  ingredients: {},
  potion: null,
  quoted: [],
  createdDate: new Date(),
  updatedDate: new Date(),
  isPublic: false,
};

const recipe = {
  title: '',
  picture: [],
  category: [],
  potion: '',
  quoted: '',
  createdDate: new Date(),
  updatedDate: new Date(),
  isPublic: false,
};

export default recipe;
