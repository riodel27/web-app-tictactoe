import { calculateWinningIndexes } from '@/lib/utils';
import React from 'react';

interface SquareProps {
  value: string | null;
  loserAvatar?: string;
  index: number;
  indexes: number[] | null;
}

const Square: React.FC<SquareProps> = ({
  value,
  loserAvatar,
  index,
  indexes,
}) => {
  const isLoser = value === loserAvatar;
  const isWinner = indexes?.includes(index);

  const loserColor = isLoser ? 'text-gray-300' : 'text-green-200';
  const winningColor = isWinner ? 'winner' : '';

  return (
    <button
      className={`float-left h-10 w-10 border border-gray-400 bg-white text-center text-2xl font-bold leading-10 ${loserColor} ${winningColor}`}
    >
      {value ?? ''}
    </button>
  );
};

interface BoardProps {
  squares: Array<string | null>;
  loserAvatar?: string;
}

const Board: React.FC<BoardProps> = ({ squares, loserAvatar }) => {
  const indexes = calculateWinningIndexes(squares);

  const renderSquare = (index: number) => (
    <Square
      key={index}
      value={squares[index]}
      loserAvatar={loserAvatar}
      index={index}
      indexes={indexes}
    />
  );

  return (
    <>
      <div className='board-row'>{[0, 1, 2].map(renderSquare)}</div>
      <div className='board-row'>{[3, 4, 5].map(renderSquare)}</div>
      <div className='board-row'>{[6, 7, 8].map(renderSquare)}</div>
    </>
  );
};

export default Board;
