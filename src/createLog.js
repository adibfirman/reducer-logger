function createLog(reducer) {
  function generateLog(state, action) {
    reducer.logger = () => {
      console.groupCollapsed('--- useReducer Logger ---')
      console.log('prev state', state)
      console.log('action', action)
      console.log('next state', reducer(state, action))
      console.groupEnd()
    }

    return reducer(state, action)
  }

  if (reducer.logger) reducer.logger()

  return generateLog
}

export default createLog
