import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
  firestoreReducer,
} from 'redux-firestore';
import { getFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import fbConfig from '../plugins/firebase';
import recipesReducer from './recipes';
import userReducer from './user';
import formReducer from './form';
import authReducer from './auth';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  formData: formReducer,
  user: userReducer,
  // auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
