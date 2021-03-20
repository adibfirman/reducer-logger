import { useReducer } from 'react'

import createLog from './createLog'

let logHasBeenCalled = false

function useLogReducer(...params) {
  const copyParams = [...params]
  const reducer = copyParams.shift()
  const toggleSignLog = () => (logHasBeenCalled = !logHasBeenCalled)
  const { reducerWithLog } = createLog({ reducer, logHasBeenCalled, toggleSignLog })
  const [state, dispatch] = useReducer(reducerWithLog, ...copyParams)

  function customDispatch(action) {
    logHasBeenCalled = false
    dispatch(action)
  }

  return [state, customDispatch]
}

export default useLogReducer
