import { useRabbitsStore } from './rabbits-store';
import React from 'react';

export const Rabbits = () => {
  const rabbits = useRabbitsStore((state) => state.rabbits);
  const arr = [];
  for (let i = 0; i < rabbits; i += 1) {
    arr.push(<span key={i}>🐰</span>);
  }
  return (
    <div>
      {arr}
    </div>
  );
};
