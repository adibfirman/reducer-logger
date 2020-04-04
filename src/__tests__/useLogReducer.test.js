import '@testing-library/jest-dom/extend-expect'
import React, { useReducer } from 'react'
import { cleanup, render } from '@testing-library/react'

import useLogReducer from '..'

describe('useLogReducer', () => {
  afterEach(cleanup)

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

  test('should return initial value', () => {
    function reducerFunc(state, action) {
      switch (action.type) {
        case 'increment':
          return { ...state, count: state.count + 1 }
        default:
          return state
      }
    }

    const initialVal = { count: 0 }
    const [state] = setup(reducerFunc, { count: 0 })

    expect(state.toString()).toBe(initialVal.toString())
  })
})
