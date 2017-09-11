import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import Pokedex from './components/pokedex/Pokedex';
import PokemonContainer from './components/pokemon/PokemonContainer';
import PokemonDetailContainer from './components/pokemon/PokemonDetailContainer';
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
          {/* <Route exact path="/pokemon" component={PokemonContainer} /> */}
          <Route path="/pokemon" component={({match}) => {
            return (
              <div>
                <Route exact path="/pokemon" component={PokemonContainer} />
                <Route path="/pokemon/:id/:edit?" component={PokemonDetailContainer} />
              </div>
            );
          }} />
          {/* <Route path="/pokemon/:id" component={PokemonDetailContainer} /> */}
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