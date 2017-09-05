import config from '../../Config.js';
const { playerData: { pokemon } } = config;

const api = () => {
  const 
  return {
    getPokemon: () => {

    },
    togglePokemonInParty: (id) => {
      // TODO: encapsulate the sample data here and add mutations
      const { pokemon } = this.state;

      const pmList = pokemon.list || [];
      for (let i = 0; i < pmList.length; i++) {
        const pm = pmList[i];
        if (pm.id === id) {
          pmList[i].party = !pmList[i].party;
        }
      }
      const updatedPokemon = { ...pokemon, list: pmList };
    }
  }
};

export default api;