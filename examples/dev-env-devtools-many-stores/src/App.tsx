/* eslint-disable react/no-multi-comp */
import './App.css';
import {
  AddBear,
  AddBee,
  AddRabbit,
  AddWolf,
  NukeBears,
  NukeBees,
  NukeRabbits,
  NukeWolves,
  RemoveBear,
  RemoveBee,
  RemoveRabbit,
  RemoveWolf,
  ShowBears,
  ShowBees,
  ShowRabbits,
  ShowWolves,
  SpecificBearsAmount,
  SpecificBeesAmount,
  SpecificRabbitsAmount,
  SpecificWolvesAmount,
} from './components/ActionButtons';
import { Bears } from './components/Bears';
import { Bees } from './components/Bees';
import { Rabbits } from './components/Rabbits';
import { Wolves } from './components/Wolves';
import { useBearsStore } from './components/Bears/bear-store';
import { useBeesStore } from './components/Bees/bees-store';
import { useRabbitsStore } from './components/Rabbits/rabbits-store';
import { useWolvesStore } from './components/Wolves/wolves-store';
import React from 'react';

const App = () => {
  const isZeroBears = useBearsStore((state) => state.bears) === 0;
  const isZeroBees = useBeesStore((state) => state.bears) === 0;
  const isZeroWolves = useWolvesStore((state) => state.wolves) === 0;
  const isZeroRabbits = useRabbitsStore((state) => state.rabbits) === 0;

  return (
    <div className="App">
      <ShowBears />
      <div className="actions">
        {isZeroBears ? null : <RemoveBear />}
        <AddBear />
        {isZeroBears ? null : <NukeBears />}
        <SpecificBearsAmount />
      </div>
      <br />
      <Bears />
      <br />
      <ShowBees />
      <div className="actions">
        {isZeroBees ? null : <RemoveBee />}
        <AddBee />
        {isZeroBees ? null : <NukeBees />}
        <SpecificBeesAmount />
      </div>
      <br />
      <Bees />
      <br />
      <ShowWolves />
      <div className="actions">
        {isZeroWolves ? null : <RemoveWolf />}
        <AddWolf />
        {isZeroWolves ? null : <NukeWolves />}
        <SpecificWolvesAmount />
      </div>
      <br />
      <Wolves />
      <br />
      <ShowRabbits />
      <div className="actions">
        {isZeroRabbits ? null : <RemoveRabbit />}
        <AddRabbit />
        {isZeroRabbits ? null : <NukeRabbits />}
        <SpecificRabbitsAmount />
      </div>
      <br />
      <Rabbits />
      <br />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
