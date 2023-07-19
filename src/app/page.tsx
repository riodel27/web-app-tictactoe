'use client';

import { columns } from '@/components/games/columns';
import { DataTable } from '@/components/games/data-table';
import { generateScoreboard } from '@/lib/utils';
import { getGamesSession } from '@/services';
import { ExtendedGameSession, GameSession } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { NewGameForm } from './game/form';

export default function Home() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    page: pageIndex + 1,
    limit: pageSize,
  };

  const dataQuery = useQuery(
    ['game-sessions', fetchDataOptions],
    () => getGamesSession(fetchDataOptions),
    { keepPreviousData: true }
  );

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const newData: ExtendedGameSession[] | undefined =
    dataQuery.data?.results.map((data: GameSession) => {
      return {
        ...data,
        numberOfRounds: data?.rounds.length,
        players: [data.player1, data.player2],
        scoreBoard: generateScoreboard(data.rounds),
      };
    });

  const data = newData ?? defaultData;

  return (
    <main className='p-6 md:p-10'>
      <h1 className='mb-4 text-4xl font-bold text-gray-800'>Tic-Tac-Toe</h1>
      <NewGameForm />

      <DataTable
        data={data}
        columns={columns}
        setPagination={setPagination}
        pagination={pagination}
        totalPages={dataQuery.data?.totalPages}
      />
    </main>
  );
}
