import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

// import './Home.css';
import PokemonDetail from './PokemonDetail.js';
import PokemonEdit from './PokemonEdit.js';
import PokemonLevelUp from './PokemonLevelUp';

import api, { MAX_MOVES, MAX_LEVEL } from '../../api/api.js';

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
      backupPmData: api.getPokemon(id),
      overwriteTarget: null
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
    const { currentMode, id, pokemon, overwriteTarget } = this.state;
    const { number, customName } = pokemon;
    const { name, image, type, levels } = POKEMON_REF_DATA[number];
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
        onEnterLevelMode={this.onEnterLevelMode.bind(this)}
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
        level={pokemon.stats.level}
        type={type}
        moveRefData={MOVES_REF_DATA}
        onCancelEdit={this.onCancelEdit.bind(this)}
        onSaveEdit={this.onSaveEdit.bind(this)}
        onStatInputChange={this.onStatInputChange.bind(this)}
        onCustomNameInputChange={this.onCustomNameInputChange.bind(this)}
      />);
    } else if (currentMode === 'level' && pokemon.stats.level < MAX_LEVEL) {
      pokemonDetailComponent = (<PokemonLevelUp
        {...pokemon}
        id={id}
        name={name}
        number={number}
        level={pokemon.stats.level}
        newLevel={levels.find(l => l.level === pokemon.stats.level + 1)}
        type={type}
        moveRefData={MOVES_REF_DATA}
        maxedMoves={pokemon.moves.length === MAX_MOVES}
        overwriteTarget={overwriteTarget}
        onLevelUp={this.onLevelUp.bind(this)}
        onCancelLevel={this.onCancelEdit.bind(this)}
        onClearOverwriteMove={this.onClearOverwriteMove.bind(this)}
        onSelectOverwriteMove={this.onSelectOverwriteMove.bind(this)}
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
    if (backupPmData) {
      this.setState({ pokemon: backupPmData });
    }
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

  onEnterLevelMode() {
    const { id, pokemon } = this.state;
    const { history } = this.props;
    const backupPmData = { ...pokemon };
    this.setState({ backupPmData });
    history.push(`/pokemon/${id}/level`);
  }

  onLevelUp(id, feature, payload) {
    console.log('level up!');
    const updatedPokemon = api.levelUpPokemon(id, feature, payload);
    this.setState({ pokemon: updatedPokemon });
  }

  onSelectOverwriteMove(overwriteTarget) {
    console.log('overwrite');
    this.setState({ overwriteTarget })
  }
  onClearOverwriteMove(overwriteTarget) {
    console.log('clear overwrite');
    this.setState({ overwriteTarget: null })
  }
}

export default PokemonDetailContainer;
