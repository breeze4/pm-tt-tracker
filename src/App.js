import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Redirect } from 'react-router';

import 'spectre.css/dist/spectre.min.css';
import './App.css';

import api from './api/api.js';

import Navigation from './components/Navigation';
import PokedexContainer from './components/pokedex/PokedexContainer';
import PokedexDetailContainer from './components/pokedex/PokedexDetailContainer';
import PokemonListContainer from './components/pokemon/PokemonListContainer';
import PokemonDetailContainer from './components/pokemon/PokemonDetailContainer';
import Trainer from './components/trainer/Trainer';
import Home from './components/Home';

import config from './Config.js';
const { BASE_URL } = config;

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Navigation />
        <div className="App-contents">
          <Route exact path="/" component={PokemonListContainer} />
          <Route path="/pokedex" component={() => (<div>
            <Route exact path="/pokedex" component={PokedexContainer} />
            <Route path="/pokedex/:number"
              component={PokedexDetailContainer} />
          </div>)} />
          <Route path="/pokemon" component={() => (<div>
            <Route exact path="/pokemon" component={PokemonListContainer} />
            <Route path="/pokemon/:id/:mode?"
              render={(props) => {
                const { match: { params: { id } } } = props;
                if (api.pokemonExists(id))
                  return (<PokemonDetailContainer {...props} />)
                else
                  return (<Redirect push to="/pokemon" />)
              }}
              onEnter={api.pokemonExist} />
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