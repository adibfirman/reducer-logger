import { useReducer } from 'react'
import { default as useLog } from './useLog'

function useLogReducer(...args) {
  const [state, dispatch] = useReducer(...args)
  useLog({ state, dispatch })

  return [state, dispatch]
}

export default useLogReducer
