'use client';

import { Row } from '@tanstack/react-table';

import { ScoreboardEntry } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const scoreBoard = row.getValue('scoreBoard') as ScoreboardEntry[];
  return (
    <Popover>
      <PopoverTrigger>@Score Boards</PopoverTrigger>
      <PopoverContent className='min-w-[180px]'>
        <Tabs defaultValue={scoreBoard[0].player}>
          <TabsList className='w-full'>
            {scoreBoard.map((data: ScoreboardEntry) => (
              <TabsTrigger
                value={data.player}
                key={data.player}
                className='w-full'
              >
                {data.player}
              </TabsTrigger>
            ))}
          </TabsList>

          {scoreBoard.map((data: ScoreboardEntry) => (
            <TabsContent
              value={data.player}
              key={data.player}
              className='rounded-lg bg-gray-100 p-4'
            >
              <div className='flex justify-between'>
                <p className='text-gray-600'>
                  Wins: <span className='text-green-600'>{data.wins}</span>
                </p>
                <p className='text-gray-600'>
                  Loss: <span className='text-red-600'>{data.loss}</span>
                </p>
                <p className='text-gray-600'>
                  Draw: <span className='text-yellow-600'>{data.draw}</span>
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
