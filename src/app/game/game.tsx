'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGameSessionStore } from '@/lib/store';
import {
  assignAvatars,
  calculateWinner,
  getKeyByValue,
  hasNoNullValues,
  isEmptyObject,
} from '@/lib/utils';
import { createGameSession } from '@/services';
import Board from './board2';
import { ChooseFirstMoveDialog, GameResultDialog } from './dialog';
import { NewGameForm } from './form';

type AvatarAssignment = Record<string, string>;

const Game: React.FC = () => {
  const router = useRouter();

  const {
    scoreboard,
    updateScoreBoard,
    addRound,
    player1,
    player2,
    rounds,
    reset,
  } = useGameSessionStore();

  const [loading, setLoading] = useState(false);

  const [chooseFirstMoveDialogvalue, setChooseFirstMoveDialogvalue] =
    useState('');
  const [openChooseFirstMoveDialog, setOpenChooseFirstMoveDialog] =
    useState(false);
  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);

  const [result, setResult] = useState('');
  const [roundResult, setRoundResult] = useState({
    winner: '',
    loser: '',
    draw: false,
  });

  const [avatars, setAvatars] = useState<AvatarAssignment>({});
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  // Determine the current player's turn based on the current move count. The first move is always assigned to "X".
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Array<string | null>) => {
    if (isEmptyObject(avatars)) {
      setOpenChooseFirstMoveDialog(true);
    } else {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  };

  const onEnd = (value: string) => {
    if (value) {
      setResult(value);
    }
    setOpenGameResultDialog(true);
  };

  const onInteractOutside = () => {
    setOpenChooseFirstMoveDialog(false);
  };

  const handleSetFirstMove = (answer: string) => {
    if (answer === 'random') {
      const preAvatars = assignAvatars(player1, player2);
      setAvatars(preAvatars);
    } else {
      setAvatars({ X: answer, O: answer === player1 ? player2 : player1 });
    }
    setChooseFirstMoveDialogvalue(answer);
  };

  const handleContinue = () => {
    addRound({ ...roundResult, sequence: rounds.length, avatars, history });

    // reset
    setAvatars({});
    setCurrentMove(0);
    setOpenGameResultDialog(false);
    setResult('');
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      const gameData = {
        player1,
        player2,
        rounds: [
          ...rounds,
          { ...roundResult, sequence: rounds.length, avatars, history },
        ],
      };

      const response = await createGameSession(gameData);

      if (response?.status === 201) {
        reset();
        router.refresh(); // FIXME: it's not clearing the cache.
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (player1) {
      updateScoreBoard({ player: player1, wins: 0, loss: 0, draw: 0 });
    }

    if (player2) {
      updateScoreBoard({ player: player2, wins: 0, loss: 0, draw: 0 });
    }
  }, [player1, player2]);

  useEffect(() => {
    if (currentSquares) {
      const winner = calculateWinner(currentSquares) as string;

      if (winner) {
        const loser = player1 === avatars[winner] ? player2 : player1;

        setRoundResult({ winner: avatars[winner], loser, draw: false });

        scoreboard.forEach((player) => {
          if (player.player === avatars[winner]) {
            updateScoreBoard({ ...player, wins: player.wins + 1 });
          }
          if (player.player === loser) {
            updateScoreBoard({ ...player, loss: player.loss + 1 });
          }
        });

        onEnd(avatars[winner]);

        return;
      }

      if (hasNoNullValues(currentSquares)) {
        // draw
        scoreboard.forEach((player) => {
          updateScoreBoard({ ...player, draw: player.draw + 1 });
        });

        setRoundResult({ winner: '', loser: '', draw: true });
        onEnd('draw');
      }
    }
  }, [currentSquares]);

  useEffect(() => {
    if (!openChooseFirstMoveDialog) {
      setChooseFirstMoveDialogvalue('');
    }
  }, [openChooseFirstMoveDialog]);

  useEffect(() => {
    // Clean-up function
    return () => {
      reset(); // Call the reset function from the store
    };
  }, []); // Empty dependency array ensures the effect runs only once, during component mount

  const currentPlayerToMove = avatars[xIsNext ? 'X' : 'O'];

  return (
    <div>
      {player1 && player2 ? (
        <>
          <div className='grid gap-4 md:grid-cols-2'>
            {scoreboard?.map((playerStats) => (
              <Card
                className={`min-w-[280px] ${
                  playerStats.player === currentPlayerToMove
                    ? 'bg-green-100'
                    : 'opacity-50'
                }`}
                key={playerStats.player}
              >
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-2xl font-bold'>
                    {playerStats.player}
                  </CardTitle>
                  <span className='text-2xl font-bold text-gray-600'>
                    {getKeyByValue(avatars, playerStats.player)}
                  </span>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-3 md:gap-4'>
                    <p className='text-center text-gray-700'>
                      <span className='text-green-500'>Wins: </span>
                      {playerStats.wins}
                    </p>
                    <p className='text-gray-700'>
                      <span className='text-red-500'>Losses: </span>
                      {playerStats.loss}
                    </p>
                    <p className='text-gray-700'>
                      <span className='text-yellow-500'>Draws: </span>
                      {playerStats.draw}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`mt-8 ${result ? 'pointer-events-none opacity-50' : ''}`}
          >
            {scoreboard && scoreboard.length > 0 && (
              <>
                <Separator className='my-10' />
                <Board
                  xIsNext={xIsNext}
                  squares={currentSquares}
                  onPlay={handlePlay}
                />
                <Separator className='my-10' />
              </>
            )}
          </div>

          {!currentMove && isEmptyObject(avatars) && (
            <Button
              className='mt-16'
              onClick={() => setOpenChooseFirstMoveDialog(true)}
            >
              Set first player
            </Button>
          )}

          {result && (
            <div className='mt-8'>
              {loading ? (
                <Button type='submit' disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button type='submit' onClick={handleStop}>
                  Stop
                </Button>
              )}

              <Button
                disabled={loading}
                className='mb-2 ml-2'
                type='submit'
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          )}

          <ChooseFirstMoveDialog
            player1={player1}
            player2={player2}
            open={openChooseFirstMoveDialog}
            onInteractOutside={onInteractOutside}
            handleSetFirstMove={handleSetFirstMove}
            chooseFirstMoveDialogvalue={chooseFirstMoveDialogvalue}
          />

          <GameResultDialog
            open={openGameResultDialog}
            onInteractOutside={() => setOpenGameResultDialog(false)}
            handleStop={handleStop}
            handleContinue={handleContinue}
            result={result}
            squares={currentSquares}
            avatar={getKeyByValue(avatars, result) as string}
            loading={loading}
          />
        </>
      ) : (
        <>
          <NewGameForm />
        </>
      )}
    </div>
  );
};

export default Game;
