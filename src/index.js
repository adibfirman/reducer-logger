import { useReducer } from 'react'

import { useCreateLog } from './useCreateLog'

function useLogReducer(...args) {
  const reducerData = useReducer(...args)

  useCreateLog(...reducerData)

  return reducerData
}

export default useLogReducer
