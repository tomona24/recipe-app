/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import './plugins/i18n';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from 'redux-firestore';
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from 'react-redux-firebase';
// import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import rootReducer from './modules/rootReducer';
import fbConfig from './plugins/firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk.withExtraArgument(getFirebase)];

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
};

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)) // to add other middleware
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
