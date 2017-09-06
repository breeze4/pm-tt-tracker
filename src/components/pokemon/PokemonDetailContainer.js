import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonDetail from './PokemonDetail.js';

import api from '../../api/api.js';

// import config from '../../Config.js';
// const { playerData: { pokemon } } = config;

class PokemonDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id } } } = props;

    this.state = {
      id: id,
      pokemon: api.getPokemon(id)
    }
  }
  render() {
    const { pokemon } = this.state;

    return (
      <div className="PokemonDetail">
        {JSON.stringify(this.props)}
      </div>
    );
  }

  onSwitchMode(event) {
    // this.setState({ editMode: !this.state.editMode });
  }

  onSelectPokemon(event, id) {
    const updatedPokemon = api.togglePokemonInParty(id);
    this.setState({ pokemon: updatedPokemon });
  }
}

export default PokemonDetailContainer;
