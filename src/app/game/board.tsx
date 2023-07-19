import { calculateWinner } from '@/lib/utils';
import React, { useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  rowIndex: number;
  colIndex: number;
  xIsNext?: boolean;
}

const Square: React.FC<SquareProps> = ({
  value,
  onSquareClick,
  rowIndex,
  colIndex,
  xIsNext,
}) => {
  const [showNextMove, setShowNextMove] = useState('');

  const isTopRow = rowIndex === 0;
  const isRightColumn = colIndex === 2;
  const isBottomRow = rowIndex === 2;
  const isLeftColumn = colIndex === 0;

  const hasTopBorder = !isTopRow ? 'border-t' : '';
  const hasRightBorder = !isRightColumn ? 'border-r' : '';
  const hasBottomBorder = !isBottomRow ? 'border-b' : '';
  const hasLeftBorder = !isLeftColumn ? 'border-l' : '';

  const handleMouseEnter = () => {
    if (!value) {
      const nextMove = xIsNext ? 'X' : 'O';
      setShowNextMove(nextMove);
    }
  };

  const handleMouseLeave = () => {
    setShowNextMove('');
  };

  return (
    <div className='h-16 md:h-28'>
      <button
        data-testid='board-square-button'
        className={`flex h-full w-full items-center justify-center ${hasTopBorder} ${hasRightBorder} ${hasBottomBorder} ${hasLeftBorder} border-gray-400 bg-white text-2xl font-bold`}
        onClick={onSquareClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {value}

        {showNextMove && !value && showNextMove}
      </button>
    </div>
  );
};

interface BoardProps {
  xIsNext?: boolean;
  squares: Array<string | null>;
  // eslint-disable-next-line no-unused-vars
  onPlay?: (_: Array<string | null>) => void;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    if (onPlay) onPlay(nextSquares);
  };

  return (
    <div className='mt-4 grid grid-cols-3'>
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onSquareClick={() => handleClick(index)}
          rowIndex={Math.floor(index / 3)}
          colIndex={index % 3}
          xIsNext={xIsNext}
        />
      ))}
    </div>
  );
};

export default Board;
