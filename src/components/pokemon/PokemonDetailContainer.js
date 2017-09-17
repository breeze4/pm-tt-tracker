import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonDetail from './PokemonDetail.js';
import PokemonEdit from './PokemonEdit.js';

import api from '../../api/api.js';

// import config from '../../Config.js';
// const { playerData: { pokemon } } = config;

import config from '../../Config.js';
const { refData } = config;
const POKEMON_REF_DATA = refData.pokemon;
const MOVES_REF_DATA = refData.moves;

const pathToImages = require.context('../../../images/pokemon');

class PokemonDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id, edit } } } = props;

    this.state = {
      id: id,
      pokemon: api.getPokemon(id),
      editMode: !!edit,
      backupPmData: api.getPokemon(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id, edit } } } = nextProps;
    this.setState({ editMode: !!edit });
  }

  render() {
    const { editMode, id, pokemon } = this.state;
    const { number } = pokemon;
    const { name, image, type } = POKEMON_REF_DATA[number];
    const imgSrc = pathToImages(`./${image}`, true);

    const pokemonDetailComponent = pokemon ?
      editMode ? (
        <PokemonEdit
          {...pokemon}
          id={id}
          editMode={editMode}
          name={name}
          imgSrc={imgSrc}
          type={type}
          moveRefData={MOVES_REF_DATA}
          onCancelEdit={this.onCancelEdit.bind(this)}
          onSaveEdit={this.onSaveEdit.bind(this)}
          onStatInputChange={this.onStatInputChange.bind(this)}
        />
      ) : (
          <PokemonDetail
            {...pokemon}
            id={id}
            name={name}
            imgSrc={imgSrc}
            type={type}
            moveRefData={MOVES_REF_DATA}
            onEnterEditMode={this.onEnterEditMode.bind(this)}
          />
        ) : null;

    return (
      <div className="PokemonDetail">
        {pokemonDetailComponent}
      </div>
    );
  }

  onCancelEdit() {
    const { id, backupPmData } = this.state;
    const { history } = this.props;
    history.push(`/pokemon/${id}`);
    this.setState({ pokemon: backupPmData });
  }

  onSaveEdit() {
    const { id, pokemon } = this.state;
    const { history } = this.props;
    history.push(`/pokemon/${id}`);
    const updatedPokemon = api.updatePokemon(id, pokemon);
  }

  onEnterEditMode() {
    const { id, pokemon } = this.state;
    const { history } = this.props;
    const backupPmData = { ...pokemon };
    this.setState({ backupPmData });
    history.push(`/pokemon/${id}/edit`);
  }

  onStatInputChange(statKey, value) {
    const { id, pokemon, pokemon: { stats } } = this.state;
    stats[statKey] = parseInt(value, 10);
    this.setState({ pokemon: { ...pokemon, stats: stats } });
  }

  onSelectPokemon(event, id) {
    const updatedPokemon = api.togglePokemonInParty(id);
    this.setState({ pokemon: updatedPokemon });
  }
}

export default PokemonDetailContainer;
