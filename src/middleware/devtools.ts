import type {} from '@redux-devtools/extension'
import type { StateCreator, StoreApi, StoreMutatorIdentifier } from '../vanilla'

// Copy types to avoid import type { Config } from '@redux-devtools/extension'
// https://github.com/pmndrs/zustand/issues/1205
type Action<T = any> = {
  type: T
}
type ActionCreator<A, P extends any[] = any[]> = {
  (...args: P): A
}
type EnhancerOptions = {
  name?: string
  actionCreators?:
    | ActionCreator<any>[]
    | {
        [key: string]: ActionCreator<any>
      }
  latency?: number
  maxAge?: number
  serialize?:
    | boolean
    | {
        options?:
          | undefined
          | boolean
          | {
              date?: true
              regex?: true
              undefined?: true
              error?: true
              symbol?: true
              map?: true
              set?: true
              function?: true | ((fn: (...args: any[]) => any) => string)
            }
        replacer?: (key: string, value: unknown) => any
        reviver?: (key: string, value: unknown) => any
        immutable?: any
        refs?: any
      }
  actionSanitizer?: <A extends Action>(action: A, id: number) => A
  stateSanitizer?: <S>(state: S, index: number) => S
  actionsBlacklist?: string | string[]
  actionsWhitelist?: string | string[]
  actionsDenylist?: string | string[]
  actionsAllowlist?: string | string[]
  predicate?: <S, A extends Action>(state: S, action: A) => boolean
  shouldRecordChanges?: boolean
  pauseActionType?: string
  autoPause?: boolean
  shouldStartLocked?: boolean
  shouldHotReload?: boolean
  shouldCatchErrors?: boolean
  features?: {
    pause?: boolean
    lock?: boolean
    persist?: boolean
    export?: boolean | 'custom'
    import?: boolean | 'custom'
    jump?: boolean
    skip?: boolean
    reorder?: boolean
    dispatch?: boolean
    test?: boolean
  }
  trace?: boolean | (<A extends Action>(action: A) => string)
  traceLimit?: number
}
type Config = EnhancerOptions & {
  type?: string
}

declare module '../vanilla' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface StoreMutators<S, A> {
    'zustand/devtools': WithDevtools<S>
  }
}

// FIXME https://github.com/reduxjs/redux-devtools/issues/1097
type Message = {
  type: string
  payload?: any
  state?: any
}

type Cast<T, U> = T extends U ? T : U
type Write<T, U> = Omit<T, keyof U> & U
type TakeTwo<T> = T extends { length: 0 }
  ? [undefined, undefined]
  : T extends { length: 1 }
  ? [...a0: Cast<T, unknown[]>, a1: undefined]
  : T extends { length: 0 | 1 }
  ? [...a0: Cast<T, unknown[]>, a1: undefined]
  : T extends { length: 2 }
  ? T
  : T extends { length: 1 | 2 }
  ? T
  : T extends { length: 0 | 1 | 2 }
  ? T
  : T extends [infer A0, infer A1, ...unknown[]]
  ? [A0, A1]
  : T extends [infer A0, (infer A1)?, ...unknown[]]
  ? [A0, A1?]
  : T extends [(infer A0)?, (infer A1)?, ...unknown[]]
  ? [A0?, A1?]
  : never

type WithDevtools<S> = Write<S, StoreDevtools<S>>

type StoreDevtools<S> = S extends {
  setState: (...a: infer Sa) => infer Sr
}
  ? {
      setState<A extends string | { type: unknown }>(
        ...a: [...a: TakeTwo<Sa>, action?: A]
      ): Sr
    }
  : never

export interface DevtoolsOptions extends Config {
  enabled?: boolean
  anonymousActionType?: string
  storeName?: string
}

type Devtools = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  initializer: StateCreator<T, [...Mps, ['zustand/devtools', never]], Mcs>,
  devtoolsOptions?: DevtoolsOptions
) => StateCreator<T, Mps, [['zustand/devtools', never], ...Mcs]>

declare module '../vanilla' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface StoreMutators<S, A> {
    'zustand/devtools': WithDevtools<S>
  }
}

type DevtoolsImpl = <T>(
  storeInitializer: StateCreator<T, [], []>,
  devtoolsOptions?: DevtoolsOptions
) => StateCreator<T, [], []>

export type NamedSet<T> = WithDevtools<StoreApi<T>>['setState']

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let extensionGlobal

const stores = []
const storeInits = []

const devtoolsImpl: DevtoolsImpl =
  (fn, devtoolsOptions = {}) =>
  (set, get, api) => {
    type S = ReturnType<typeof fn>
    type PartialState = Partial<S> | ((s: S) => Partial<S>)

    const { enabled, anonymousActionType, storeName, ...options } =
      devtoolsOptions
    let extensionConnector:
      | typeof window['__REDUX_DEVTOOLS_EXTENSION__']
      | false
    try {
      extensionConnector =
        (enabled ?? __DEV__) && window.__REDUX_DEVTOOLS_EXTENSION__
    } catch {
      // ignored
    }

    if (!extensionConnector) {
      if (__DEV__ && enabled) {
        console.warn(
          '[zustand devtools middleware] Please install/enable Redux devtools extension'
        )
      }
      return fn(set, get, api)
    }

    let extension = extensionGlobal;
    if (extensionGlobal === undefined && storeName !== undefined) {
      extensionGlobal = extensionConnector.connect(options)
      extension = extensionGlobal
    }
    if (storeName === undefined) {
      extension = extensionConnector.connect(options)
    }

    let isRecording = true
    ;(api.setState as NamedSet<S>) = (state, replace, nameOrAction) => {
      const r = set(state, replace)
      if (!isRecording) return r
      if (storeName === undefined) {
        extension.send(
          nameOrAction === undefined
            ? { type: anonymousActionType || 'anonymous' }
            : typeof nameOrAction === 'string'
            ? { type: nameOrAction }
            : nameOrAction,
          get()
        )
        return r
      }
      const storesStates = stores.map((storeState) => ({
        ...storeState.getState(),
        store: storeState.store,
      }))
      const currentStates = {}
      storesStates.forEach((storeState) => {
        currentStates[String(storeState.store)] = storeState
      })
      function getNameOrAction(name) {
        if (name !== undefined && typeof name === 'string') {
          return { type: name }
        }
        if (
          name !== undefined &&
          typeof name !== 'string' &&
          storeName !== undefined
        ) {
          return `${storeName}/${name.type}`
        }
        if (name !== undefined) {
          return name
        }
        return { type: anonymousActionType || 'anonymous' }
      }
      extension.send(getNameOrAction(nameOrAction), {
        ...currentStates,
        [storeName]: { ...api.getState(), store: storeName },
      })
      return r
    }

    const setStateFromDevtools: StoreApi<S>['setState'] = (...a) => {
      const originalIsRecording = isRecording
      isRecording = false
      set(...a)
      isRecording = originalIsRecording
    }

    const initialState = fn(api.setState, get, api)
    if (storeName === undefined) {
      extension.init(initialState)
    } else {
      stores.push({ ...api, store: storeName })
      storeInits.push({ ...initialState, store: storeName })
      const inits = {}
      storeInits.forEach((storeState) => {
        inits[String(storeState.store)] = storeState
      })
      extension.init(inits)
      console.warn('zustand initialized with initial state', inits)
    }

    if (
      (api as any).dispatchFromDevtools &&
      typeof (api as any).dispatch === 'function'
    ) {
      let didWarnAboutReservedActionType = false
      const originalDispatch = (api as any).dispatch
      ;(api as any).dispatch = (...a: any[]) => {
        if (
          __DEV__ &&
          a[0].type === '__setState' &&
          !didWarnAboutReservedActionType
        ) {
          console.warn(
            '[zustand devtools middleware] "__setState" action type is reserved ' +
              'to set state from the devtools. Avoid using it.'
          )
          didWarnAboutReservedActionType = true
        }
        ;(originalDispatch as any)(...a)
      }
    }

    ;(
      extension as unknown as {
        // FIXME https://github.com/reduxjs/redux-devtools/issues/1097
        subscribe: (
          listener: (message: Message) => void
        ) => (() => void) | undefined
      }
    ).subscribe((message: any) => {
      switch (message.type) {
        case 'ACTION':
          if (typeof message.payload !== 'string') {
            console.error(
              '[zustand devtools middleware] Unsupported action format'
            )
            return
          }
          return parseJsonThen<{ type: unknown; state?: PartialState }>(
            message.payload,
            (action) => {
              if (action.type === '__setState') {
                if (
                  JSON.stringify(api.getState()) !==
                  JSON.stringify(action.state[storeName])
                ) {
                  setStateFromDevtools(action.state as PartialState)
                }
                return
              }

              if (!(api as any).dispatchFromDevtools) return
              if (typeof (api as any).dispatch !== 'function') return
              ;(api as any).dispatch(action)
            }
          )

        case 'DISPATCH':
          switch (message.payload.type) {
            case 'RESET':
              setStateFromDevtools(initialState)
              if (storeName === undefined) {
                extension.init(api.getState())
                return
              }
              // eslint-disable-next-line no-case-declarations
              const storesStates1 = stores.map((storeState) => ({
                ...storeState.getState(),
                store: storeState.store,
              }))
              // eslint-disable-next-line no-case-declarations
              const currentStates1 = {}
              storesStates1.forEach((storeState) => {
                currentStates1[String(storeState.store)] = storeState
              })
              return extension.init(currentStates1)

            case 'COMMIT':
              if (storeName === undefined) {
                extension.init(api.getState())
                return
              }
              // eslint-disable-next-line no-case-declarations
              const storesStates2 = stores.map((storeState) => ({
                ...storeState.getState(),
                store: storeState.store,
              }))
              // eslint-disable-next-line no-case-declarations
              const currentStates2 = {}
              storesStates2.forEach((storeState) => {
                currentStates2[String(storeState.store)] = storeState
              })
              return extension.init(currentStates2)

            case 'ROLLBACK':
              return parseJsonThen<S>(message.state, (state) => {
                if (storeName === undefined) {
                  setStateFromDevtools(state)
                  extension.init(api.getState())
                  return
                }
                setStateFromDevtools(state[storeName])
                const storesStates3 = stores.map((storeState) => ({
                  ...storeState.getState(),
                  store: storeState.store,
                }))
                const currentStates3 = {}
                storesStates3.forEach((storeState) => {
                  currentStates3[String(storeState.store)] = storeState
                })
                extension.init(currentStates3)
              })

            case 'JUMP_TO_STATE':
            case 'JUMP_TO_ACTION':
              return parseJsonThen<S>(message.state, (state) => {
                if (storeName === undefined) {
                  setStateFromDevtools(state)
                  return
                }
                if (
                  JSON.stringify(api.getState()) !==
                  JSON.stringify(state[storeName])
                ) {
                  setStateFromDevtools(state[storeName])
                }
              })

            case 'IMPORT_STATE': {
              const { nextLiftedState } = message.payload
              const lastComputedState =
                nextLiftedState.computedStates.slice(-1)[0]?.state
              if (!lastComputedState) return
              if (storeName === undefined) {
                setStateFromDevtools(lastComputedState)
              } else {
                setStateFromDevtools(lastComputedState[storeName])
              }
              extension.send(
                null as any, // FIXME no-any
                nextLiftedState
              )
              return
            }

            case 'PAUSE_RECORDING':
              return (isRecording = !isRecording)
          }
          return
      }
    })

    return initialState
  }
export const devtools = devtoolsImpl as unknown as Devtools

const parseJsonThen = <T>(stringified: string, f: (parsed: T) => void) => {
  let parsed: T | undefined
  try {
    parsed = JSON.parse(stringified)
  } catch (e) {
    console.error(
      '[zustand devtools middleware] Could not parse the received json',
      e
    )
  }
  if (parsed !== undefined) f(parsed as T)
}
