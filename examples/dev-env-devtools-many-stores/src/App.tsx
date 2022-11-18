/* eslint-disable react/no-multi-comp */
import './App.css';
import {
  AddBear,
  AddBee,
  NukeBears,
  NukeBees,
  RemoveBear,
  RemoveBee,
  RemoveRabbit,
  ShowBears,
  ShowBees,
  SpecificBearsAmount,
  SpecificBeesAmount,
  SpecificRabbitsAmount,
  SpecificWolvesAmount,
} from './components/ActionButtons';
import { Bears } from './components/Bears';
import { Bees } from './components/Bees';
import { useBearsStore } from './components/Bears/bear-store';
import React from 'react';

const App = () => {
  const isZeroBears = useBearsStore((state) => state.bears) === 0;
  const isZeroBees = useBearsStore((state) => state.bears) === 0;
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
export default App;import { ShowWolves } from './components/ActionButtons/index';
import { RemoveWolf } from './components/ActionButtons/index';
import { AddWolf } from './components/ActionButtons/index';
import { NukeWolves } from './components/ActionButtons/index';
import { useWolvesStore } from './components/Wolves/wolves-store';
import { Wolves } from './components/Wolves/index';
import { ShowRabbits } from './components/ActionButtons/index';
import { AddRabbit } from './components/ActionButtons/index';
import { NukeRabbits } from './components/ActionButtons/index';
import { Rabbits } from './components/Rabbits/index';
import { useRabbitsStore } from './components/Rabbits/rabbits-store';

