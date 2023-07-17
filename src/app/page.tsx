import { columns } from '@/components/games/columns';
import { DataTable } from '@/components/games/data-table';

import { generateScoreboard } from '@/lib/utils';
import { getGamesSession } from '@/services';
import { ExtendedGameSession, GameSession } from '@/types';
import { NewGameForm } from './game/form';

export default async function Home() {
  const gameSession = await getGamesSession();

  const newData: ExtendedGameSession[] = gameSession.results.map(
    (data: GameSession) => {
      return {
        ...data,
        numberOfRounds: data?.rounds.length,
        players: [data.player1, data.player2],
        scoreBoard: generateScoreboard(data.rounds),
      };
    }
  );

  return (
    <main className='p-2 md:p-10'>
      <h1 className='mb-4 text-4xl font-bold text-gray-800'>Tic-Tac-Toe</h1>
      <NewGameForm />

      <DataTable data={newData} columns={columns} />
    </main>
  );
}
