const recipe = {
  id: null,
  name: '',
  picture: [],
  category: [],
  tags: [],
  flow: {
    id: '',
    order: '',
    ingredients: [],
  }, // instructionsとingredientsと配列を→オブジェクト：IDとオーダー
  // instructions: {},
  ingredients: {},
  potion: null,
  review: {
    star: null, // number
    memo: '',
  },
  quoted: [],
};

export default recipe;
