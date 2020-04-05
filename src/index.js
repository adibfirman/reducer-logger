import { useReducer } from 'react'

import createLog from './createLog'

function useLogReducer(...params) {
  const copyParams = [...params]
  const reducer = copyParams.shift()
  const reducerData = useReducer(createLog(reducer), ...copyParams)

  return reducerData
}

export default useLogReducer
