import { useGameSessionStore } from '@/lib/store';
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import Board from './board';
import Game from './game';

const BUTTON_SQAURE_TEST_ID = 'board-square-button';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({})),
}));

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

jest.mock('../../lib/utils', () => ({
  isEmptyObject: jest.fn(() => false),
  getKeyByValue: jest.fn(() => 'X'),
  cn: jest.fn(() => ''),
  calculateWinner: jest.fn(() => ''),
  hasNoNullValues: jest.fn(() => true),
}));

describe('Game', () => {
  beforeEach(() => {});

  it('should show show empty game board initially on each round', async () => {
    const squares = Array(9).fill(null);

    render(<Board squares={squares} />);

    const buttons = screen.getAllByTestId(BUTTON_SQAURE_TEST_ID);

    buttons.forEach((button) => {
      expect(button).toHaveTextContent('');
    });
  });

  it('should reflect the updated move on valid move', async () => {
    const { result } = renderHook(() => useGameSessionStore());

    await waitFor(() => {
      result.current.setPlayers('Player one', 'Player Two');

      result.current.updateScoreBoard({
        player: 'Player one',
        wins: 0,
        loss: 0,
        draw: 0,
      });

      result.current.updateScoreBoard({
        player: 'Player Two',
        wins: 0,
        loss: 0,
        draw: 0,
      });
    });

    render(<Game />);

    const squareButtons = screen.getAllByTestId(BUTTON_SQAURE_TEST_ID);
    const squareButton = squareButtons[0]; // Select the first element from the array

    expect(squareButton).toHaveTextContent('');

    fireEvent.click(squareButton);

    const updatedSquareButton = screen.getAllByTestId(BUTTON_SQAURE_TEST_ID); // Re-query the squareButton after the click event
    expect(updatedSquareButton[0]).toHaveTextContent('X');
  });
});
