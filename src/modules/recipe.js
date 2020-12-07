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
  quoted: [],
};

export default recipe;
