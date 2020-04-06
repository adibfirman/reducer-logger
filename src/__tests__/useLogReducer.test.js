import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'

import useLogReducer from '..'

afterEach(cleanup)

describe('useLogReducer', () => {
  // mocking console
  const originalLog = console.log
  const consoleOpt = []
  const mockedConsole = (...output) => consoleOpt.push([...output])
  afterEach(() => (console.log = originalLog))
  beforeEach(() => {
    console.groupCollapsed = mockedConsole
    console.groupEnd = mockedConsole
    console.log = mockedConsole
  })

  const initialState = { count: 0 }
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + 1 }
      default:
        throw new Error('Unknown action type')
    }
  }

  function Example() {
    const [state, dispatch] = useLogReducer(reducer, initialState)

    return (
      <div>
        <button onClick={() => dispatch({ type: 'decrement' })}>{'-'}</button>
        <span>Num: {state.count}</span>
        <button onClick={() => dispatch({ type: 'increment' })}>{'+'}</button>
      </div>
    )
  }

  test('should return initial value and logger not trigger in first render', () => {
    render(<Example />)
    expect(consoleOpt).toEqual([])
  })

  test('print to browser log are, prev state, action and next state', () => {
    const { getByText } = render(<Example />)
    const incrementBtn = getByText('+')
    const decrementBtn = getByText('-')

    expect(getByText(/num: 0/i)).toBeInTheDocument()
    expect(consoleOpt).toEqual([])

    fireEvent.click(incrementBtn)

    expect(getByText(/num: 1/i)).toBeInTheDocument()
    expect(consoleOpt).toEqual([
      ['%c--- useReducer Logger ---', 'font-weight: bold;'],
      ['%cprev state', 'color: #9E9E9E;', { count: 0 }],
      ['%caction', 'color: #00AFF8;', { type: 'increment' }],
      ['%cnext state', 'color: #4AB14D;', { count: 1 }],
      [],
    ])
  })
})
