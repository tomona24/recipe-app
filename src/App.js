import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { firestore } from './plugins/firebase';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </Router>
    </div>
  );
}

export default App;
