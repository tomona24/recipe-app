import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import recipeReducer from './reducers/recipesReducer';

const store = createStore(
  recipeReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
);

export default store;
