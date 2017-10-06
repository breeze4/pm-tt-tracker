import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';
import './components.css';

import Navigation from './components/Navigation';
import PokedexContainer from './components/pokedex/PokedexContainer';
import PokedexDetailContainer from './components/pokedex/PokedexDetailContainer';
import PokemonContainer from './components/pokemon/PokemonContainer';
import PokemonDetailContainer from './components/pokemon/PokemonDetailContainer';
import Trainer from './components/trainer/Trainer';
import Home from './components/Home';

import config from './Config.js';
const { BASE_URL } = config;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="App-contents">
          <Route exact path="/" component={Home} />
          <Route path="/pokedex" component={() => (<div>
            <Route exact path="/pokedex" component={PokedexContainer} />
            <Route path="/pokedex/:number" component={PokedexDetailContainer} />
          </div>)} />
          <Route path="/pokemon" component={() => (<div>
            <Route exact path="/pokemon" component={PokemonContainer} />
            <Route path="/pokemon/:id/:mode?" component={PokemonDetailContainer} />
          </div>)} />
          <Route path="/trainer" component={Trainer} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = () => (
  <Router basename={BASE_URL}>
    <App />
  </Router>
);

export default AppWithRouter;