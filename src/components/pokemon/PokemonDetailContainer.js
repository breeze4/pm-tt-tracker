import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonDetail from './PokemonDetail.js';
import PokemonEdit from './PokemonEdit.js';
import PokemonLevelUp from './PokemonLevelUp';

import api from '../../api/api.js';

// import config from '../../Config.js';
// const { playerData: { pokemon } } = config;

import config from '../../Config.js';
const { refData } = config;
const POKEMON_REF_DATA = refData.pokemon;
const MOVES_REF_DATA = refData.moves;

const pathToImages = require.context('../../../images/pokemon');

const VALID_MODES = ['edit', 'view', 'level'];

class PokemonDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id, mode } } } = props;

    let currentMode = 'view';
    if (VALID_MODES.includes(mode)) {
      currentMode = mode;
    }

    this.state = {
      id: id,
      pokemon: api.getPokemon(id),
      currentMode: currentMode,
      backupPmData: api.getPokemon(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id, mode } } } = nextProps;
    let currentMode = 'view';
    if (VALID_MODES.includes(mode)) {
      currentMode = mode;
    }
    this.setState({ currentMode: currentMode });
  }

  render() {
    const { currentMode, id, pokemon } = this.state;
    const { number, customName } = pokemon;
    const { name, image, type } = POKEMON_REF_DATA[number];
    const imgSrc = pathToImages(`./${image}`, true);

    let pokemonDetailComponent = pokemon ? (
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

    if (currentMode === 'edit') {
      pokemonDetailComponent = (<PokemonEdit
        {...pokemon}
        id={id}
        editMode={true}
        name={name}
        customName={customName}
        imgSrc={imgSrc}
        type={type}
        moveRefData={MOVES_REF_DATA}
        onCancelEdit={this.onCancelEdit.bind(this)}
        onSaveEdit={this.onSaveEdit.bind(this)}
        onStatInputChange={this.onStatInputChange.bind(this)}
        onCustomNameInputChange={this.onCustomNameInputChange.bind(this)}
        onLevelUp={this.onLevelUp.bind(this)}
      />);
    } else if (currentMode === 'level') {
      pokemonDetailComponent = (<PokemonLevelUp
        {...pokemon}
        id={id}
        name={name}
        customName={customName}
        imgSrc={imgSrc}
        type={type}
        moveRefData={MOVES_REF_DATA}
      />);
    }

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

  onCustomNameInputChange(customName) {
    const { id, pokemon } = this.state;
    this.setState({ pokemon: { ...pokemon, customName } });
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

  onLevelUp() {
    console.log('level up!');
  }
}

export default PokemonDetailContainer;
