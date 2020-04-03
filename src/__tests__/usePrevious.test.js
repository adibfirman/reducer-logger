import '@testing-library/jest-dom/extend-expect'
import React, { useState } from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'

import { usePrevious } from '../usePrevious'

describe('usePrevious', () => {
  afterEach(cleanup)

  function App() {
    const [count, setCount] = useState(0)
    const prevCount = usePrevious(count)

    return (
      <div>
        <p data-testid="currentState">curr: {count}</p>
        <p data-testid="prevState">prev: {prevCount}</p>
        <button
          data-testid="button"
          onClick={() => setCount(num => num + 1)}
        ></button>
      </div>
    )
  }

  test('initial render, prev state should undefined', () => {
    const { getByTestId, debug } = render(<App />)
    const prevState = getByTestId('prevState')
    const currState = getByTestId('currentState')

    expect(prevState).toHaveTextContent(/prev:/i)
    expect(currState).toHaveTextContent(/curr: 0/i)
  })

  test('prev state should render a prev data', () => {
    const { getByTestId, debug } = render(<App />)
    const prevState = getByTestId('prevState')
    const currState = getByTestId('currentState')
    const button = getByTestId('button')

    expect(prevState).toHaveTextContent(/prev:/i)
    expect(currState).toHaveTextContent(/curr: 0/i)

    fireEvent.click(button)

    expect(prevState).toHaveTextContent(/prev: 0/i)
    expect(currState).toHaveTextContent(/curr: 1/i)
  })
})
