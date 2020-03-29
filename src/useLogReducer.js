import { useReducer } from 'react'

function useLogReducer(...args) {
  const reducer = useReducer(...args)

  return reducer
}

export default useLogReducer
