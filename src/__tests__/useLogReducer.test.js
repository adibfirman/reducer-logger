import '@testing-library/jest-dom/extend-expect'
import React, { useReducer } from 'react'
import { cleanup, render, act } from '@testing-library/react'

import useLogReducer from '..'

afterEach(cleanup)

describe('useLogReducer', () => {
  // mocking console
  const originalLog = console.log
  const consoleOpt = []
  const mockedConsole = (...output) => consoleOpt.push([...output])
  afterEach(() => (console.log = originalLog))
  beforeEach(() => {
    console.group = mockedConsole
    console.groupEnd = mockedConsole
    console.log = mockedConsole
  })

  const initialVal = { count: 0 }
  const App = ({ children, args }) => children(useLogReducer(...args))
  function reducerFunc(state, action) {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + 1 }
      default:
        return state
    }
  }

  function setup(...args) {
    let returnVal

    render(
      <App args={args}>
        {val => {
          returnVal = val
          return null
        }}
      </App>
    )

    return returnVal
  }

  test('should return initial value and logger not trigger in first render', () => {
    const [state] = setup(reducerFunc, initialVal)

    expect(consoleOpt).toEqual([])
  })

  test('print to browser log are, prev state, action and next state', () => {
    const [state, dispatch] = setup(reducerFunc, initialVal)
    act(() => dispatch({ type: 'increment' }))

    expect(consoleOpt).toEqual([
      ['--- useReducer Logger ---'],
      ['prev state', { count: 0 }],
      ['action', { type: 'increment' }],
      ['next state', { count: 1 }],
      [],
      ['--- useReducer Logger ---'],
      ['prev state', { count: 0 }],
      ['action', { type: 'increment' }],
      ['next state', { count: 1 }],
      [],
    ])
  })
})
