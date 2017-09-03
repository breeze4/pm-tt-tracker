import React, { Component } from 'react';

import './Pokedex.css';

import config from '../../Config.js';

class Pokedex extends Component {
  render() {
    return (
      <div className="Pokedex">
        pokedex
        <ul className="Pokedex-list">
        </ul>
      </div>
    );
  }
}

export default Pokedex;
