'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ExtendedGameSession } from '@/types';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<ExtendedGameSession>[] = [
  {
    accessorKey: 'numberOfRounds',
    header: 'Rounds',
    cell: ({ row }) => {
      return (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Game Session',
    cell: ({ row }) => (
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='w-[60px] truncate md:w-[80px]'>
              {row.getValue('id')}
            </TooltipTrigger>
            <TooltipContent>
              <p> {row.getValue('id')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'players',
    header: 'Players',
    cell: ({ row }) => {
      const players: string[] = row.getValue('players');

      return (
        <div className='flex space-x-2'>
          {players.map((data) => (
            <Badge key={data} variant='outline'>
              {data}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'scoreBoard',
    accessorKey: 'scoreBoard',
    header: 'Score Board',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
