/* eslint-disable react/no-multi-comp */
import { useBearsStore } from '../Bears/bear-store'
import { useBeesStore } from '../Bees/bees-store'
import React, { FC } from 'react'
import { useRabbitsStore } from '../Rabbits/rabbits-store'
import { useWolvesStore } from '../Wolves/wolves-store'

export const ShowBears: FC = () => {
  const bears = useBearsStore((state) => state.bears)
  return <p>{bears} bears in the forest</p>
}

export const ShowBees: FC = () => {
  const bees = useBeesStore((state) => state.bees)
  return <p>{bees} bees in the forest</p>
}

export const ShowRabbits: FC = () => {
  const rabbits = useRabbitsStore((state) => state.rabbits)
  return <p>{rabbits} Rabbits in the forest</p>
}

export const ShowWolves: FC = () => {
  const wolves = useWolvesStore((state) => state.wolves)
  return <p>{wolves} wolves in the forest</p>
}

export const AddBear: FC = () => {
  const incrementBear = useBearsStore((state) => state.increasePopulation)
  return (
    <button type="button" onClick={() => incrementBear()}>
      Add a bear
    </button>
  )
}

export const RemoveBear: FC = () => {
  const removeBear = useBearsStore((state) => state.removeBear)
  return (
    <button type="button" onClick={() => removeBear()}>
      Remove a bear
    </button>
  )
}

export const NukeBears: FC = () => {
  const removeAllBears = useBearsStore((state) => state.removeAllBears)
  return (
    <button type="button" onClick={() => removeAllBears()}>
      Nuke all bears
    </button>
  )
}

export const SpecificBearsAmount: FC = () => {
  const specificBearsAmount = useBearsStore(
    (state) => state.setSpecificBearsAmount
  )
  return (
    <button type="button" onClick={() => specificBearsAmount(25)}>
      Set 25 bears
    </button>
  )
}

export const AddBee: FC = () => {
  const incrementBees = useBeesStore((state) => state.increasePopulation)
  return (
    <button type="button" onClick={() => incrementBees()}>
      Add a bee
    </button>
  )
}

export const RemoveBee: FC = () => {
  const removeBee = useBeesStore((state) => state.removeBee)

  return (
    <button type="button" onClick={() => removeBee()}>
      Remove a bee
    </button>
  )
}

export const NukeBees: FC = () => {
  const removeAllBees = useBeesStore((state) => state.removeAllBees)
  return (
    <button type="button" onClick={() => removeAllBees()}>
      Nuke all bees
    </button>
  )
}

export const SpecificBeesAmount: FC = () => {
  const specificBeesAmount = useBeesStore(
    (state) => state.setSpecificBeesAmount
  )
  return (
    <button type="button" onClick={() => specificBeesAmount(25)}>
      Set 25 bees
    </button>
  )
}

export const AddRabbit: FC = () => {
  const incrementRabbit = useRabbitsStore((state) => state.increasePopulation)
  return (
    <button type="button" onClick={() => incrementRabbit()}>
      Add a Rabbit
    </button>
  )
}

export const RemoveRabbit: FC = () => {
  const removeRabbit = useRabbitsStore((state) => state.removeRabbit)
  return (
    <button type="button" onClick={() => removeRabbit()}>
      Remove a Rabbit
    </button>
  )
}

export const NukeRabbits: FC = () => {
  const removeAllRabbits = useRabbitsStore((state) => state.removeAllRabbits)
  return (
    <button type="button" onClick={() => removeAllRabbits()}>
      Nuke all Rabbits
    </button>
  )
}

export const SpecificRabbitsAmount: FC = () => {
  const specificRabbitsAmount = useRabbitsStore(
    (state) => state.setSpecificRabbitsAmount
  )
  return (
    <button type="button" onClick={() => specificRabbitsAmount(25)}>
      Set 25 Rabbits
    </button>
  )
}

export const AddWolf: FC = () => {
  const incrementWolf = useWolvesStore((state) => state.increasePopulation)
  return (
    <button type="button" onClick={() => incrementWolf()}>
      Add a Wolf
    </button>
  )
}

export const RemoveWolf: FC = () => {
  const removeWolf = useWolvesStore((state) => state.removeWolf)
  return (
    <button type="button" onClick={() => removeWolf()}>
      Remove a Wolf
    </button>
  )
}

export const NukeWolves: FC = () => {
  const removeAllWolfs = useWolvesStore((state) => state.removeAllWolves)
  return (
    <button type="button" onClick={() => removeAllWolfs()}>
      Nuke all Wolfs
    </button>
  )
}

export const SpecificWolvesAmount: FC = () => {
  const specificWolfsAmount = useWolvesStore(
    (state) => state.setSpecificWolvesAmount
  )
  return (
    <button type="button" onClick={() => specificWolfsAmount(25)}>
      Set 25 Wolfs
    </button>
  )
}
