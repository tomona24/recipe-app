import { createStore, compose } from 'redux';
import recipesReducer from './reducers/recipesReducer';

const store = createStore(
  recipesReducer,
  compose(
    process.env.NODE_ENV === 'development' && window.devToolsExtension
      ? window.devToolsExtension()
      : (f) => f
  )
);
export default store;
