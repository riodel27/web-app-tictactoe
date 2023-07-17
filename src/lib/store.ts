import { GameRound, ScoreboardEntry } from '@/types';
import { create } from 'zustand';

interface GameSessionState {
  player1: string;
  player2: string;
  scoreboard: ScoreboardEntry[];
  rounds: GameRound[];
  // eslint-disable-next-line no-unused-vars
  updateScoreBoard: (player: ScoreboardEntry) => void;
  // eslint-disable-next-line no-unused-vars
  addRound: (round: GameRound) => void;
  // eslint-disable-next-line no-unused-vars
  setPlayers: (player1: string, player2: string) => void;
  reset: () => void;
}

export const useGameSessionStore = create<GameSessionState>((set) => ({
  player1: '',
  player2: '',
  scoreboard: [],
  rounds: [],
  updateScoreBoard: (player) =>
    set((state) => {
      const existingPlayerIndex = state.scoreboard.findIndex(
        (item) => item.player === player.player
      );
      if (existingPlayerIndex !== -1) {
        const updatedScoreboard = [...state.scoreboard];
        updatedScoreboard[existingPlayerIndex] = player;
        return { scoreboard: updatedScoreboard };
      } else {
        return { scoreboard: [...state.scoreboard, player] };
      }
    }),
  addRound: (round) =>
    set((state) => ({
      rounds: [...state.rounds, round],
    })),
  setPlayers: (player1, player2) => set({ player1, player2 }),
  reset: () =>
    set({
      player1: '',
      player2: '',
      scoreboard: [],
      rounds: [],
    }),
}));
