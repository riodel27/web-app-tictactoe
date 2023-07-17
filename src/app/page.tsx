'use client';

import { columns } from '@/components/games/columns';
import { DataTable } from '@/components/games/data-table';
import { generateScoreboard } from '@/lib/utils';
import { ExtendedGameSession, GameSession } from '@/types';
import { useFetch } from 'usehooks-ts';
import { NewGameForm } from './game/form';

export default function Home() {
  const queryParams = new URLSearchParams({
    populate: 'rounds',
    sortBy: 'createdAt:desc',
    limit: '10000',
    page: '1',
  });

  const url = `${process.env.API_URL}/api/game/list?${queryParams}`;

  const { data, error } = useFetch<any>(url);

  if (error) return <p>There is an error.</p>;
  if (!data)
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mt-4'>
            <svg
              className='mx-auto h-8 w-8 animate-spin text-gray-700'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 1.647A7.962 7.962 0 0120 12h4a8 8 0 01-8 8v-4zm-2-5.291l-3 1.647V4.362A7.963 7.963 0 0116 12h4z'
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );

  const newData: ExtendedGameSession[] = data.results.map(
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
