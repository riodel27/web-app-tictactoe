import { GameRound, ScoreboardEntry } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export function hasNoNullValues<T>(arr: (T | null)[]): boolean {
  return arr.every((value) => value !== null);
}

export function calculateWinner(squares: Array<string | null>): string | null {
  const lines: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function assignAvatars(
  player1: string,
  player2: string
): Record<string, string> {
  const players = [player1, player2];
  const avatars = ['X', 'O'];

  const randomizedIndices = avatars
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5);

  const assignedAvatars: Record<string, string> = {};
  randomizedIndices.forEach((index, i) => {
    assignedAvatars[avatars[i]] = players[index];
  });

  return assignedAvatars;
}

export function getKeyByValue(
  obj: Record<string, string>,
  value: string
): string | undefined {
  return Object.keys(obj).find((key) => obj[key] === value);
}

export const generateRandomString = (): string => {
  const timestamp: string = new Date().getTime().toString();
  const randomString: string = Math.random().toString(36).substring(2);
  return timestamp + randomString;
};

export function generateScoreboard(gameRounds: GameRound[]): ScoreboardEntry[] {
  const scoreboard: ScoreboardEntry[] = [];

  for (const gameRound of gameRounds) {
    const { winner, loser, draw } = gameRound;

    // Update wins for the winner
    if (winner) {
      const winnerEntry = scoreboard.find((entry) => entry.player === winner);
      if (winnerEntry) {
        winnerEntry.wins += 1;
      } else {
        scoreboard.push({ player: winner, wins: 1, loss: 0, draw: 0 });
      }
    }

    // Update losses for the loser
    if (loser) {
      const loserEntry = scoreboard.find((entry) => entry.player === loser);
      if (loserEntry) {
        loserEntry.loss += 1;
      } else {
        scoreboard.push({ player: loser, wins: 0, loss: 1, draw: 0 });
      }
    }

    // Update draws if it's a draw
    if (draw) {
      for (const avatar in gameRound.avatars) {
        const player = gameRound.avatars[avatar];
        const drawEntry = scoreboard.find((entry) => entry.player === player);
        if (drawEntry) {
          drawEntry.draw += 1;
        } else {
          scoreboard.push({ player, wins: 0, loss: 0, draw: 1 });
        }
      }
    }
  }

  return scoreboard;
}

export const calculateWinningIndexes = (
  squares: Array<string | null>
): number[] | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return null;
};
