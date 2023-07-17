'use client';

import { ExtendedGameSession, GameRound, RoundColumn } from '@/types';
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { Button } from '../ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import Board from './Board';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const renderSubComponent = <TData,>({
  row,
  roundColumns,
}: {
  row: Row<TData>;
  roundColumns: RoundColumn[];
}) => {
  const originalData = row.original as ExtendedGameSession;

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {roundColumns.map((column: RoundColumn) => (
                <TableHead key={column.accessor}>{column.Header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {originalData.rounds?.length ? (
              originalData.rounds.map((round: GameRound) => (
                <TableRow key={round.id}>
                  {roundColumns.map((column: RoundColumn) => (
                    <TableCell key={column.accessor}>
                      {column.accessor == 'history' ? (
                        <>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Button variant='link' className='text-xs'>
                                @Board
                              </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className='w-full'>
                              <Board
                                squares={
                                  round[column.accessor][
                                    round[column.accessor].length - 1
                                  ]
                                }
                                loserAvatar={Object.keys(round.avatars).find(
                                  (key) => round.avatars[key] === round.loser
                                )}
                              />
                            </HoverCardContent>
                          </HoverCard>
                        </>
                      ) : column.accessor === 'loser' ? (
                        <>
                          <span className='text-slate-400'>
                            {round[column.accessor]}
                          </span>
                        </>
                      ) : (
                        <span>
                          {typeof round[column.accessor] === 'boolean' &&
                          round[column.accessor] === true
                            ? 'DRAW'
                            : String(round[column.accessor])}
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className='h-24 text-center'>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const roundColumns: RoundColumn[] = React.useMemo(
    () => [
      { Header: 'Winner', accessor: 'winner' },
      { Header: 'Loser', accessor: 'loser' },
      { Header: 'Draw', accessor: 'draw' },
      { Header: 'Board', accessor: 'history' },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        {renderSubComponent<TData>({ row, roundColumns })}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
