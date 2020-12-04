import { createStore, compose } from 'redux';
import recipeApp from './reducers/recipesReducer';

const store = createStore(
  recipeApp
  // compose(
  //   process.env.NODE_ENV === 'development' && window.devToolsExtension
  //     ? window.devToolsExtension()
  //     : (f) => f
  // )
);
export default store;
