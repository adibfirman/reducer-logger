import '@testing-library/jest-dom/extend-expect'
import React, { useReducer } from 'react'
import { cleanup, render } from '@testing-library/react'

import useLogReducer from '..'

afterEach(cleanup)

describe('useLogReducer', () => {
  // mocking console
  const originalLog = console.log
  const consoleOpt = []
  const mockedConsole = (...output) => consoleOpt.push([...output])
  beforeEach(() => (console.log = mockedConsole))
  afterEach(() => (console.log = originalLog))

  const App = ({ children, args }) => children(useLogReducer(...args))
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

  test('should return initial value, with prev state undefined', () => {
    const initialVal = { count: 0 }
    function reducerFunc(state, action) {
      switch (action.type) {
        case 'increment':
          return { ...state, count: state.count + 1 }
        default:
          return state
      }
    }
    const [state] = setup(reducerFunc, initialVal)

    expect(consoleOpt).toEqual([
      ['prev state: ', undefined],
      ['next state: ', { count: 0 }],
    ])
  })
})
