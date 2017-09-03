import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import Pokedex from './components/pokedex/Pokedex';
import Pokemon from './components/pokemon/Pokemon';
import Trainer from './components/trainer/Trainer';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="App-contents">
          <Route exact path="/" component={Home} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/pokemon" component={Pokemon} />
          <Route path="/trainer" component={Trainer} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = () => (
  <Router>
    <App />

  </Router>
);

export default AppWithRouter;