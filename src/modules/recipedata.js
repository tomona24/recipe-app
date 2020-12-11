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
  ingredients: {
    id: '',
    name: '',
    potion: [], // veiw: '2~5'
    unit: {
      pre: '',
      denominator: [], // view:'/5' or '/5~ /5'
      su: '',
    },
  },
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
