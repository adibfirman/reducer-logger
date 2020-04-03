import '@testing-library/jest-dom/extend-expect'
import React, { useReducer } from 'react'
import { cleanup, render } from '@testing-library/react'

import useLog from '../useLog'
import useLogReducer from '..'

const App = ({ children, ...rest }) => children(useLog(rest))
function setup(props) {
  const returnVal = {}

  render(
    <App {...props}>
      {val => {
        Object.assign(returnVal, val)
        return null
      }}
    </App>
  )

  return returnVal
}

test('should return with initial value', () => {
  const state = { count: 0 }
  const { prevState } = setup({ state })

  expect(prevState).toBe(undefined)
})

afterEach(cleanup)
