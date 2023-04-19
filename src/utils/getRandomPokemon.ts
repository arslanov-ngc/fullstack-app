const MAX_DEX_ID = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne
) => {
  const pokedexNum = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  return pokedexNum !== notThisOne ? pokedexNum : getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
  const firstID = getRandomPokemon();
  const secondID = getRandomPokemon(firstID);

  return [firstID, secondID];
};
