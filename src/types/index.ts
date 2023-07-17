export interface ScoreboardEntry {
  player: string;
  wins: number;
  loss: number;
  draw: number;
}

export interface GameRound {
  id?: string;
  winner: string;
  loser: string;
  draw: boolean;
  avatars: {
    [key: string]: string;
  };
  history: Array<Array<string | null>>;
  sequence: number;
}

export interface GameSession {
  id: string;
  player1: string;
  player2: string;
  scoreboard?: ScoreboardEntry[] | undefined;
  rounds: GameRound[];
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface GameSessionResultData {
  results: GameSession[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface Round {
  id?: string;
  avatars: {
    [key: string]: string;
  };
  winner: string;
  loser: string;
  draw: boolean;
  sequence: number;
  history: (string | null)[][];
}

export interface CreateGameSessionBody {
  player1: string;
  player2: string;
  rounds?: Round[];
  scoreboard?: ScoreboardEntry[];
}

export interface ExtendedGameSession extends GameSession {
  numberOfRounds: number;
  players: [string, string];
  scoreBoard: ScoreboardEntry[];
}

export interface RoundColumn {
  Header: string;
  accessor: keyof GameRound;
}
