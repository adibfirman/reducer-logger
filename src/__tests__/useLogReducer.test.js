import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'

import useLogReducer from '..'

afterEach(cleanup)

describe('useLogReducer', () => {
  const originalLog = console.log
  afterAll(() => (console.log = originalLog))

  const initialState = { count: 0 }
  function reducer(state, action) {
    switch (action.type) {
      case 'decrement':
        return { ...state, count: state.count - 1 }
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

  describe('Check log output in first time render', () => {
    const consoleOpt = []
    const mockedConsole = (...output) => consoleOpt.push([...output])
    beforeEach(() => {
      console.groupCollapsed = mockedConsole
      console.groupEnd = mockedConsole
      console.log = mockedConsole
    })

    test('should not create a log', () => {
      render(<Example />)
      expect(consoleOpt).toEqual([])
    })
  })

  describe('check log output when trigger increment button', () => {
    const consoleOpt = []
    const mockedConsole = (...output) => consoleOpt.push([...output])
    beforeEach(() => {
      console.groupCollapsed = mockedConsole
      console.groupEnd = mockedConsole
      console.log = mockedConsole
    })

    test('should print prev, action and next log', () => {
      const { getByText } = render(<Example />)
      const incrementBtn = getByText('+')

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

  describe('check log output when trigger decrement button', () => {
    const consoleOpt = []
    const mockedConsole = (...output) => consoleOpt.push([...output])
    beforeEach(() => {
      console.groupCollapsed = mockedConsole
      console.groupEnd = mockedConsole
      console.log = mockedConsole
    })

    test('test decrement button and print the log', () => {
      const { getByText } = render(<Example />)
      const decrementBtn = getByText('-')

      expect(getByText(/num: 0/i)).toBeInTheDocument()
      expect(consoleOpt).toEqual([])

      fireEvent.click(decrementBtn)

      expect(getByText(/num: -1/i)).toBeInTheDocument()
      expect(consoleOpt).toEqual([
        ['%c--- useReducer Logger ---', 'font-weight: bold;'],
        ['%cprev state', 'color: #9E9E9E;', { count: 0 }],
        ['%caction', 'color: #00AFF8;', { type: 'decrement' }],
        ['%cnext state', 'color: #4AB14D;', { count: -1 }],
        [],
      ])
    })
  })
})
