import { useState } from "react";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const [ids, setIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: first });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <main className='h-screen w-screen flex flex-col justify-center items-center relative'>
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
      </main>
    );

  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center relative'>
      <h1 className='text-3xl text-center'>Which Pokemon is Rounder?</h1>
      <div className='p-10 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in'>
        <div className='p-2' />
        <section
          className='flex flex-col items-center transition-opacity w-48'
          suppressHydrationWarning={true}
        >
          <img
            src={firstPokemon?.data?.sprites?.front_default as string}
            alt={firstPokemon?.data?.name}
            className='w-full'
          />
          <h3 className='text-1xl text-center capitalize mt-[-1rem]'>
            {firstPokemon?.data?.name}
          </h3>
        </section>
        <span className='p-8 italic text-xl'>or</span>
        <section
          className='flex flex-col items-center transition-opacity w-48'
          suppressHydrationWarning={true}
        >
          <img
            src={secondPokemon?.data?.sprites?.front_default as string}
            alt={secondPokemon?.data?.name}
            className='w-full'
          />
          <h3 className='text-1xl text-center capitalize mt-[-1rem]'>
            {secondPokemon?.data?.name}
          </h3>
        </section>
      </div>
    </main>
  );
}
