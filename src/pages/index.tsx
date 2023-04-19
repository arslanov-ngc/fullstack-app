import { trpc } from "@/utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  if (!hello.data) return <div>loading...</div>;

  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center relative'>
      <h1 className='text-3xl text-center'>Which Pokemon is Rounder?</h1>
      <div className='p-10 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in'>
        <section className='flex flex-col items-center transition-opacity'>
          {hello.data.greeting}
        </section>
        <span className='p-8 italic text-xl'>or</span>
        <section className='flex flex-col items-center transition-opacity'>
          s
        </section>
        <span className='p-2' />
      </div>
    </main>
  );
}
