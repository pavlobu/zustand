import { bearsAndBeesConnectionGroupName } from '../../constants';
import { devOnlyDevtools as devtools } from '../../utils-devtools';
import { immer } from '@pavlobu/zustand/middleware/immer';
import create from '@pavlobu/zustand';

export interface BeesState {
  bees: number;
  increasePopulation: () => void;
  removeBee: () => void;
  removeAllBees: () => void;
  setSpecificBeesAmount: (n: number) => void;
}

export const useBeesStore = create<BeesState>()(
  devtools(
    immer((set) => ({
      bees: 0,
      increasePopulation: () => set(
        (store) => {
          store.bees += 1;
        },
        false,
        { type: 'increasePopulation' },
      ),
      removeBee: () => set(
        (store) => {
          store.bees -= 1;
        },
        false,
        { type: 'removeBee' },
      ),
      removeAllBees: () => set(
        (store) => {
          store.bees = 0;
        },
        false,
        { type: 'removeAllBees' },
      ),
      setSpecificBeesAmount: (amount: number) => set(
        (store) => {
          store.bees = amount;
        },
        false,
        { type: 'setSpecificBeesAmount' },
      ),
    })),
    { name: bearsAndBeesConnectionGroupName, store: 'app/bees' },
  ),
);
