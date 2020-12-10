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
  yeild: null,
  quoted: [],
  createdDate: new Date(),
  updatedDate: new Date(),
  isPublic: false,
};

const recipe = {
  title: '',
  picture: [],
  category: [],
  yeild: '',
  quoted: '',
  createdDate: new Date(),
  updatedDate: new Date(),
  isPublic: false,
  memo: '',
};

export default recipe;
