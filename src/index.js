import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './modules/store';
import './index.css';
import './plugins/i18n';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Container from './modules/Container';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
