import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
