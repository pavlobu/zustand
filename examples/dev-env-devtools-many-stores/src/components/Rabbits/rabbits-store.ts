import { devOnlyDevtools as devtools } from '../../utils-devtools';
import { immer } from '@pavlobu/zustand/middleware/immer';
import { rabbitsAndWolvesConnectionGroupName } from '../../constants';
import create from '@pavlobu/zustand';

export interface RabbitsState {
  rabbits: number;
  increasePopulation: () => void;
  removeRabbit: () => void;
  removeAllRabbits: () => void;
  setSpecificRabbitsAmount: (n: number) => void;
}

export const useRabbitsStore = create<RabbitsState>()(
  devtools(
    immer((set) => ({
      rabbits: 0,
      increasePopulation: () => set(
        (store) => {
          store.rabbits += 1;
        },
        false,
        { type: 'increasePopulation' },
      ),
      removeRabbit: () => set(
        (store) => {
          store.rabbits -= 1;
        },
        false,
        { type: 'removeRabbit' },
      ),
      removeAllRabbits: () => set(
        (store) => {
          store.rabbits = 0;
        },
        false,
        { type: 'removeAllRabbits' },
      ),
      setSpecificRabbitsAmount: (amount: number) => set(
        (store) => {
          store.rabbits = amount;
        },
        false,
        { type: 'setSpecificRabbitsAmount' },
      ),
    })),
    { name: rabbitsAndWolvesConnectionGroupName, store: 'app/rabbits' },
  ),
);
