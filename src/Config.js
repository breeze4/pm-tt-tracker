import APP_DATA from './APP_DATA.json';
import REFERENCE_DATA from './REFERENCE_DATA.json';
import POKEMON_REFERENCE_DATA from './POKEMON_REFERENCE_DATA.json';

const mergedRefData = {
  ...REFERENCE_DATA, pokemon: POKEMON_REFERENCE_DATA
}

const config = {
  appData: APP_DATA,
  refData: mergedRefData
}

export default config;