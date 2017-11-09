import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

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
const HP_INCREASE_REF_DATA = refData.hpIncreases;
const STAT_INCREASE_REF_DATA = refData.statIncreases;

const pathToImages = require.context('../../../images/pokemon');

const VALID_MODES = ['edit', 'view', 'level'];

class PokemonDetailContainer extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id, mode } }, history } = props;

    let currentMode = 'view';
    if (VALID_MODES.includes(mode)) {
      currentMode = mode;
    }

    const currentPm = api.getPokemon(id);
    const { levels } = POKEMON_REF_DATA[currentPm.number];
    const newLevel = levels.find(l => l.LVL === currentPm.stats.LVL + 1);
    let availableStatPoints = null;
    if (newLevel) {
      availableStatPoints = STAT_INCREASE_REF_DATA[newLevel.statIncreases];
    }

    this.state = {
      id: id,
      pokemon: api.getPokemon(id),
      currentMode: currentMode,
      backupPmData: api.getPokemon(id),
      overwriteTarget: null,
      remainingStatPoints: availableStatPoints,
      statIncreaseKeys: [],
      confirmDelete: false,
      originalStats: api.getPokemon(id).stats
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id, mode } } } = nextProps;
    let currentMode = 'view';
    if (VALID_MODES.includes(mode)) {
      currentMode = mode;
    }
    this.setState({
      currentMode: currentMode,
      pokemon: api.getPokemon(id)
    });
  }

  render() {
    const { currentMode, id, pokemon, overwriteTarget, statIncreaseKeys,
      remainingStatPoints, backupPmData, originalStats, confirmDelete } = this.state;
    const { number, customName, stats: { LVL } } = pokemon;
    const { name, image, type, levels } = POKEMON_REF_DATA[number];
    const imgSrc = pathToImages(`./${image}`, true);

    const newLevel = levels.find(l => l.LVL === LVL + 1);

    let pokemonDetailComponent = pokemon ? (
      <PokemonDetail
        {...pokemon}
        id={id}
        name={name}
        imgSrc={imgSrc}
        type={type}
        moveRefData={MOVES_REF_DATA}
        confirmDelete={confirmDelete}
        onDelete={this.onDelete.bind(this)}
        onConfirmDelete={this.onConfirmDelete.bind(this)}
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
        type={type}
        moveRefData={MOVES_REF_DATA}
        onCancelEdit={this.onCancelEdit.bind(this)}
        onSaveEdit={this.onSaveEdit.bind(this)}
        onStatInputChange={this.onStatInputChange.bind(this)}
        onCustomNameInputChange={this.onCustomNameInputChange.bind(this)}
      />);
    } else if (currentMode === 'level' && pokemon.stats.LVL < MAX_LEVEL) {
      pokemonDetailComponent = (<PokemonLevelUp
        {...pokemon}
        id={id}
        name={name}
        number={number}
        LVL={pokemon.stats.LVL}
        newLevel={newLevel}
        type={type}
        moveRefData={MOVES_REF_DATA}
        maxedMoves={pokemon.moves.length === MAX_MOVES}
        overwriteTarget={overwriteTarget}
        statPoints={remainingStatPoints}
        originalStats={originalStats}
        statIncreaseKeys={statIncreaseKeys}
        onLevelUp={this.onLevelUp.bind(this)}
        onCancelLevel={this.onCancelEdit.bind(this)}
        onClearOverwriteMove={this.onClearOverwriteMove.bind(this)}
        onSelectOverwriteMove={this.onSelectOverwriteMove.bind(this)}
        onChangeStat={this.onChangeStat.bind(this)}
      />);
    }

    return (
      <div className="pokemon-detail">
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
    api.updatePokemon(id, pokemon);
  }

  onEnterEditMode() {
    const { id, pokemon } = this.state;
    const { history } = this.props;
    const backupPmData = cloneDeep(pokemon);
    this.setState({ backupPmData });
    history.push(`/pokemon/${id}/edit`);
  }

  onCustomNameInputChange(customName) {
    const { pokemon } = this.state;
    this.setState({ pokemon: { ...pokemon, customName } });
  }

  onStatInputChange(statKey, value) {
    const { pokemon, pokemon: { stats } } = this.state;
    stats[statKey] = parseInt(value, 10);
    this.setState({ pokemon: { ...pokemon, stats: stats } });
  }

  onChangeStat(statKey, change) {
    const { pokemon, pokemon: { number, stats }, remainingStatPoints, statIncreaseKeys } = this.state;
    if (statKey === 'HP') {
      const hpIncreaseKey = POKEMON_REF_DATA[number].hpIncrease;
      const hpIncrease = HP_INCREASE_REF_DATA[hpIncreaseKey];
      if (change > 0) stats[statKey] + hpIncrease;
      else if (change < 0) stats[statKey] - hpIncrease;
    }
    else {
      stats[statKey] += change;
    }
    let updatedKeys = statIncreaseKeys;
    let updatedStatPoints = remainingStatPoints - change;
    if (change < 0 && statIncreaseKeys.includes(statKey)) {
      // if the stat has already been increased and is now being decreased
      // only remove the first one, leave the other one there
      const firstIndex = statIncreaseKeys.findIndex(key => key == statKey);
      updatedKeys.splice(firstIndex, 1);
    } else if (change > 0) {
      // if stat is being increased and isn't in the list
      updatedKeys.push(statKey);
    }

    this.setState({
      pokemon: { ...pokemon, stats: stats },
      remainingStatPoints: updatedStatPoints,
      statIncreaseKeys: updatedKeys
    });
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
    if (updatedPokemon) {
      const { levels } = POKEMON_REF_DATA[updatedPokemon.number];
      const newLevel = levels.find(l => l.LVL === updatedPokemon.stats.LVL + 1);
      let availableStatPoints = null;
      if (newLevel) {
        availableStatPoints = STAT_INCREASE_REF_DATA[newLevel.statIncreases];
      }
      this.setState({
        pokemon: updatedPokemon,
        originalStats: updatedPokemon.stats,
        statIncreaseKeys: [],
        remainingStatPoints: availableStatPoints
      });
    }
  }

  onSelectOverwriteMove(overwriteTarget) {
    console.log('overwrite');
    this.setState({ overwriteTarget });
  }
  onClearOverwriteMove(overwriteTarget) {
    console.log('clear overwrite');
    this.setState({ overwriteTarget: null });
  }
  onDelete(id) {
    console.log('delete pm');
    this.setState({ confirmDelete: true });
  }
  onConfirmDelete(id) {
    console.log('confirm delete pm');
    const { history } = this.props;
    this.setState({ confirmDelete: false });
    api.deletePokemon(id);
    history.push(`/pokemon`);
  }
}

export default PokemonDetailContainer;
