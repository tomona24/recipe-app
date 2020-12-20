import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
  firestoreReducer,
} from 'redux-firestore';
import {
  getFirebase,
  firebaseReducer,
  reactReduxFirebase,
} from 'react-redux-firebase';
import firebase from 'firebase/app';
import fbConfig from '../plugins/firebase';
import recipesReducer from './recipes';
import userReducer from './user';
import formReducer from './form';
import authReducer from './auth';
import imagesReducer from './images';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  formData: formReducer,
  user: userReducer,
  auth: authReducer,
  images: imagesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(firebase, fbConfig),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default rootReducer;
