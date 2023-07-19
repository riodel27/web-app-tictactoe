import { act } from '@testing-library/react';
import * as zustand from 'zustand';

const { create: actualCreate } = jest.requireActual<typeof zustand>('zustand');

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

export const create = <S>(createState: zustand.StateCreator<S>) => {
  return typeof createState === 'function'
    ? createInternalFn(createState)
    : createInternalFn;
};

const createInternalFn = <S>(createState: zustand.StateCreator<S>) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
