import { immer } from '@pavlobu/zustand/middleware/immer'
import { rabbitsAndWolvesConnectionGroupName } from '../../constants'
import create from '@pavlobu/zustand'
import { devOnlyDevtools as devtools } from '../../utils-devtools'

export interface WolvesState {
  wolves: number
  increasePopulation: () => void
  removeWolf: () => void
  removeAllWolves: () => void
  setSpecificWolvesAmount: (n: number) => void
}

export const useWolvesStore = create<WolvesState>()(
  devtools(
    immer((set) => ({
      wolves: 0,
      increasePopulation: () =>
        set(
          (store) => {
            store.wolves += 1
          },
          false,
          { type: 'increasePopulation' }
        ),
      removeWolf: () =>
        set(
          (store) => {
            store.wolves -= 1
          },
          false,
          { type: 'removeWolf' }
        ),
      removeAllWolves: () =>
        set(
          (store) => {
            store.wolves = 0
          },
          false,
          { type: 'removeAllWolves' }
        ),
      setSpecificWolvesAmount: (amount: number) =>
        set(
          (store) => {
            store.wolves = amount
          },
          false,
          { type: 'setSpecificWolvesAmount' }
        ),
    })),
    { name: rabbitsAndWolvesConnectionGroupName, store: 'app/wolves' }
  )
)
