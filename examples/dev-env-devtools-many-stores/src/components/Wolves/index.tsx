import { useWolvesStore } from './wolves-store'
import React from 'react'

export const Wolves = () => {
  const wolves = useWolvesStore((state) => state.wolves)
  const arr = []
  for (let i = 0; i < wolves; i += 1) {
    arr.push(<span key={i}>🐺</span>)
  }
  return <div>{arr}</div>
}
