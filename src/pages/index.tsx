import { useState } from "react";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";

const btn =
  "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 mt-2 rounded inline-flex items-center";

export default function Home() {
  const [ids, setIDs] = useState(getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: first });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: second });

  const voteForRoundest = (selected: number) => {
    setIDs(getOptionsForVote());
  };

  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center relative'>
      <h1 className='text-3xl text-center'>Which Pokemon is Rounder?</h1>
      <div className='p-10 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in'>
        {firstPokemon.isLoading ? (
          <Loader />
        ) : firstPokemon.data ? (
          <PokemonListing
            pokemon={firstPokemon?.data}
            vote={voteForRoundest}
            id={first}
          />
        ) : (
          <h3 className='w-40 text-2xl text-center'>Pokemon not found</h3>
        )}
        <span className='p-8 italic text-xl'>or</span>
        {secondPokemon.isLoading ? (
          <Loader />
        ) : secondPokemon.data ? (
          <PokemonListing
            pokemon={secondPokemon?.data}
            vote={voteForRoundest}
            id={second}
          />
        ) : (
          <h3 className='w-40 text-2xl text-center'>Pokemon not found</h3>
        )}
      </div>
    </main>
  );
}

const PokemonListing: React.FC<{
  pokemon: any;
  vote: (id: number) => void;
  id: number;
}> = ({ pokemon, vote, id }) => {
  return (
    <section
      className='flex flex-col items-center transition-opacity w-48'
      suppressHydrationWarning={true}
    >
      <img
        src={pokemon?.image as string}
        alt={pokemon?.name}
        className='w-full'
      />
      <h3 className='text-1xl text-center capitalize mt-[-1rem]'>
        {pokemon?.name}
      </h3>
      <button className={btn} onClick={() => vote(id)}>
        Rounder
      </button>
    </section>
  );
};

function Loader() {
  return (
    <div className='loadingio-spinner-spinner-3n9uv8y00ig'>
      <div className='ldio-355id06117f'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
