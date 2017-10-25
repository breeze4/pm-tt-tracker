import React, { Component } from 'react';

import PokedexItem from './PokedexItem';

import computeRating from '../../api/computeRating';

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
    const rating = event.target.value || 'ALL';
    console.log('selected rating: ', rating);
    if (rating === 'ALL') {
      this.setState({ ratingFilter: rating });
    } else {
      this.setState({ ratingFilter: parseInt(rating, 10) });
    }
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
          <PokedexItem key={number}
            number={number}
            {...entry} />
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
