import Game from './game';

export default async function GamePage() {
  return (
    <main className='flex min-h-screen flex-col items-center p-12 md:p-24'>
      <h1 className='mb-4 text-4xl font-bold text-gray-800 md:mb-10'>
        Tic-Tac-Toe
      </h1>
      <Game />
    </main>
  );
}
