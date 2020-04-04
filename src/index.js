import { useReducer, useRef } from 'react'

import { usePrevious } from './usePrevious'

function useLogReducer(...args) {
  const reducerData = useReducer(...args)

  return reducerData
}

export default useLogReducer
