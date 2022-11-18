# @pavlobu/zustand

This is a better zustand middleware.
Use `@pavlobu/zustand` everywhere you use `zustand` instead of `zustand` to leverage features of this project.

### This project is based on https://github.com/pmndrs/zustand

Please read [original readme](https://github.com/pmndrs/zustand#readme)

## Quickstart

`npm i @pavlobu/zustand`

### Usage example `js`:

```js
import { devOnlyDevtools as devtools } from '@pavlobu/zustand/middleware'
import { immer } from '@pavlobu/zustand/middleware/immer'
import create from '@pavlobu/zustand'

export const useBearsStore = create(
  devtools(
    immer((set) => ({
      bears: 0,
      increasePopulation: () =>
        set(
          (store) => {
            store.bears += 1
          },
          false,
          { type: 'increasePopulation' }
        ),
      removeBear: () =>
        set(
          (state) => {
            state.bears -= 1
          },
          false,
          { type: 'removeBear' }
        ),
      removeAllBears: () =>
        set(
          (state) => {
            state.bears = 0
          },
          false,
          { type: 'removeAllBears' }
        ),
      setSpecificBearsAmount: (amount) =>
        set(
          (state) => {
            state.bears = amount
          },
          false,
          { type: 'setSpecificBearsAmount' }
        ),
    })),
    { name: '@pavlobu/zustand', store: 'app/bears' }
  )
)
```

### Usage example `ts`

[In this demo project](https://github.com/pavlobu/zustand/tree/%40pavlobu-zustand-devtools-middleware/examples/dev-env-devtools-many-stores)

# Improvements in this repo `devtools` middleware:

Demo react project with example of following improvements can be found [here](https://github.com/pavlobu/zustand/tree/%40pavlobu-zustand-devtools-middleware/examples/dev-env-devtools-many-stores)

- improve redux devtools usage. One redux devtools tab can be used for all stores
- use devtools extension only in non prod env
- add example/dev-env-devtools-many-stores with usage of this repo package
- backward compatibility with previous devtools middleware zustand api

---

## Demo of redux devtools rewind feature

In this demo you can see a Redux Devtools Extension state rewind feature in action, when multiple zustand stores connected to one Redux Devtools Extension connection.
The code for this demo can be found [here](https://github.com/pavlobu/zustand/tree/%40pavlobu-zustand-devtools-middleware/examples/dev-env-devtools-many-stores)

![demo of zustand devtools middleware by pavlobu. showing how redux devtools rewind feature works](https://github.com/pavlobu/zustand/blob/e0ffeebebfb825f30c36992f2110f978f4f44c93/examples/dev-env-devtools-many-stores/docs/img/zustand-devtools-rewind.gif)

## Note on versioning

`@pavlobu/zustand` is based on original `zustand`
The versions are kept the same as in `zustand` but with `-<number>` suffixes.
For example first fix of `zustand@4.1.4` version would make
`@pavlobu/zustand@4.1.4-1` verison for current package.
