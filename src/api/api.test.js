import React from 'react';
import ReactDOM from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import api, { evolvePokemon, raiseStatsOnPokemon } from './api';

const FIRST_LEVEL_PM = JSON.parse(`{
  "id": "985123a0-7e4f-11e7-9022-fb7190c856e4",
  "number": "004",
  "name": "Charmander",
  "customName": "Charmander",
  "party": true,
  "stats": {
    "hp": 15,
    "maxHp": 10,
    "level": 1,
    "attack": 10,
    "defense": 10,
    "specialAttack": 10,
    "specialDefense": 10,
    "speed": 10,
    "captureDifficulty": 10
  },
  "moves": [
    "TEST",
    "NORMAL_TAIL_WHIP"
  ]
}`);

const MAX_LEVEL_PM = JSON.parse(`{
  "id": "df7cca36-3d7a-40f4-8f06-ae03cc22f045",
  "number": "006",
  "name": "Charizard",
  "customName": "Foxboro",
  "party": false,
  "stats": {
    "hp": 20,
    "maxHp": 120,
    "level": 20,
    "attack": 15,
    "defense": 15,
    "specialAttack": 15,
    "specialDefense": 15,
    "speed": 15,
    "captureDifficulty": 10
  },
  "moves": [
    "TEST",
    "NORMAL_TAIL_WHIP",
    "FIRE_FLAMETHROWER",
    "NORMAL_WRAP"
  ]
}`);

describe('api: ', () => {

  let level1Pm, level20;
  beforeEach(() => {
    level1Pm = cloneDeep(FIRST_LEVEL_PM);
    level20 = cloneDeep(MAX_LEVEL_PM);
  });

  it('api is created with sample data', () => {
    expect(api.getPokemon());
  });
  it('api evolves charmander to charmeleon', () => {
    const statChange = JSON.parse(`{
      "hp": 5,
      "attack": 2,
      "defense": 2,
      "specialAttack": 2,
      "specialDefense": 2,
      "speed": 2
    }`);
    expect(level1Pm.name).toBe('Charmander');
    expect(level1Pm.number).toBe('004');
    expect(level1Pm.stats.attack).toBe(10);
    expect(level1Pm.stats.defense).toBe(10);
    expect(level1Pm.stats.specialAttack).toBe(10);
    expect(level1Pm.stats.specialDefense).toBe(10);
    expect(level1Pm.stats.speed).toBe(10);
    evolvePokemon(level1Pm, statChange, '005');
    expect(level1Pm.name).toBe('Charmeleon');
    expect(level1Pm.number).toBe('005');
    expect(level1Pm.stats.attack).toBe(12);
    expect(level1Pm.stats.defense).toBe(12);
    expect(level1Pm.stats.specialAttack).toBe(12);
    expect(level1Pm.stats.specialDefense).toBe(12);
    expect(level1Pm.stats.speed).toBe(12);
  });
  it('api raises two stats by 1', () => {
    expect(level1Pm.stats.attack).toBe(10);
    expect(level1Pm.stats.defense).toBe(10);
    raiseStatsOnPokemon(level1Pm, 'attack', 'defense');
    expect(level1Pm.stats.attack).toBe(11);
    expect(level1Pm.stats.defense).toBe(11);
  });
  it('api raises one stat by 2', () => {
    expect(level1Pm.stats.attack).toBe(10);
    expect(level1Pm.stats.defense).toBe(10);
    raiseStatsOnPokemon(level1Pm, 'attack');
    expect(level1Pm.stats.attack).toBe(12);
    expect(level1Pm.stats.defense).toBe(10);
  });
  it('api raises one stat by 2 with both params', () => {
    expect(level1Pm.stats.attack).toBe(10);
    expect(level1Pm.stats.defense).toBe(10);
    raiseStatsOnPokemon(level1Pm, null, 'attack');
    expect(level1Pm.stats.attack).toBe(12);
    expect(level1Pm.stats.defense).toBe(10);
  });

});
