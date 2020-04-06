# Reducer Logger

Hooks for see activity your awesome `useReducer` React API

## Installation

```bash
$ npm i --save reducer-logger
# or
$ yarn add reducer-logger
```

## Usage

Just replace your original `useReducer` from React API, and automatically the log will be appears in your browser console, example code like this:

```jsx
import React from 'react'
import useLogReducer from 'reducer-logger'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    default:
      throw new Error('Unknown action type')
  }
}

function MyApp() {
  const [state, dispatch] = useLogReducer(reducer, { count: 0 })

  return (
    <div>
      <button onClick={() => dispatch({ type: 'decrement' })}>{'-'}</button>
      <span>Num: {state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>{'+'}</button>
    </div>
  )
}
```

## Usage just in Development mode

If you want to use this for Development mode only, you can create some utils to change the `useReducer` API with `useLogReducer` example code:

```jsx
import { useReducer } from 'react'
import useLogReducer from 'reducer-logger'

const isDev = process.env.NODE_ENV === 'development'
const reducerAPI = isDev ? useLogReducer : useReducer

export default reducerAPI
```

## Contributing

Contributions are welcome.
