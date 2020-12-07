import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
// import firebase from 'firebase/app';
import recipeReducer from './reducers/recipesReducer';
import firebase, { rrfConfig } from '../plugins/firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  recipeReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase }))
    // reduxFirestore(firebase, fbConfig),
    // reactReduxFirebase(fbConfig)
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
