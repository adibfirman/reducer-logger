import '@testing-library/jest-dom/extend-expect'
import React, { useState } from 'react'
import { cleanup, render } from '@testing-library/react'

import useLogReducer from '..'

describe('useLogReducer', () => {
  afterEach(cleanup)

  it('should render hello world', () => {
    function Page() {
      function reducer(state, action) {
        switch (action.type) {
          case 'increment':
            return { ...state, count: state.count + 1 }
          default:
            return state
        }
      }

      const [state, dispatch] = useLogReducer(reducer, { count: 0 })

      return (
        <>
          <div>num {state.count}</div>
          <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
      )
    }

    const { debug } = render(<Page />)

    debug()
  })
})
