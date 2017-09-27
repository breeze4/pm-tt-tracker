import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PokedexItem from './PokedexItem';

import api from '../../api/api.js';

import './pokedex.css';

import config from '../../Config.js';
const { refData } = config;

class PokedexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  render() {
    const { pokedex } = this.props;

    const pokedexListItems = Object.keys(pokedex).map((number) => {
      const entry = pokedex[number];
      return (
        <li key={number}>
          <Link to={`/pokedex/${number}`}>
            <PokedexItem
              number={number}
              {...entry} />
          </Link>
        </li>
      );
    });
    return (
      <div className="Pokedex">
        pokedex
        <ul className="Pokedex-list">
          {pokedexListItems}
        </ul>
      </div>
    );
  }
}

PokedexContainer.defaultProps = {
  pokedex: refData.pokemon
}

export default PokedexContainer;
