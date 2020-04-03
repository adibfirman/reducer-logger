import { useReducer, useRef } from 'react'

import { usePrevious } from './usePrevious'

function useLog({ state, dispatch }) {
  const prevState = usePrevious(state)

  return { prevState }
}

export default useLog
