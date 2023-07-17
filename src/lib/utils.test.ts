import { calculateWinner } from './utils';

describe('calculateWinner', () => {
  it('should correctly identify a winning condition', () => {
    // Set up the test case with a winning condition
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];

    const winner = calculateWinner(squares);

    // Assert that the calculateWinner function correctly identifies the winning condition
    expect(winner).toBe('X');
  });

  it('should return null for a non-winning condition', () => {
    // Set up the test case with a non-winning condition
    const squares = ['X', 'O', 'X', 'O', 'X', 'O', null, null, null];

    const winner = calculateWinner(squares);

    // Assert that the calculateWinner function returns null for a non-winning condition
    expect(winner).toBeNull();
  });
});
