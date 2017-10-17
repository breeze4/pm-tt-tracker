import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PokedexItem from './PokedexItem';

import api from '../../api/api.js';
import computeRating from '../../api/computeRating';

import './pokedex.css';

import config from '../../Config.js';
const { refData } = config;
const TYPES = refData.types;

class PokedexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratingFilter: 'ALL',
      typeFilter: 'ALL'
    }
  }

  onRatingFilterChange(event) {
    console.log('selected rating: ', event.target.value);
    this.setState({ ratingFilter: parseInt(event.target.value, 10) });
  }

  onTypeFilterChange(event) {
    console.log('selected type: ', event.target.value);
    this.setState({ typeFilter: event.target.value });
  }

  render() {
    const { pokedex } = this.props;
    const { ratingFilter, typeFilter } = this.state;

    const typesList = Object.keys(TYPES).map((key => {
      const typeInfo = TYPES[key];
      const { name, color } = typeInfo;
      return (
        <option key={key} value={key}>
          {name}
        </option>
      );
    }));

    const ratingsList = [1, 2, 3, 4, 5].map((rating => {
      return (
        <option key={rating} value={rating}>
          {`${rating} star`}
        </option>
      );
    }));

    const pokedexListItems = Object.keys(pokedex)
      .filter((number) => {
        const { type } = pokedex[number];
        return type.includes(typeFilter) || typeFilter === 'ALL';
      })
      .filter((number) => {
        const { baseStats } = pokedex[number];
        const rating = computeRating(baseStats);
        return rating === ratingFilter || ratingFilter === 'ALL';
      })
      .map((number) => {
        const entry = pokedex[number];
        return (
          <li key={number} className="card-container ">
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
        <span className="h6">Filter By:</span>
        <div className="columns">
          <div className="column col-6">
            <span>Type: </span>
            <select value={this.state.typeFilter}
              onChange={this.onTypeFilterChange.bind(this)}
              className="btn">
              <option key={'ALL'} value={'ALL'}>All</option>
              {typesList}
            </select>
          </div>
          <div className="column col-6">
            <span>Rating: </span>
            <select value={this.state.ratingFilter}
              onChange={this.onRatingFilterChange.bind(this)}
              className="btn">
              <option key={'ALL'} value={'ALL'}>All</option>
              {ratingsList}
            </select>
          </div>
        </div>
        <span className="h6">Pokedex:</span>
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
