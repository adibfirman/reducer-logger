function createLog(reducer) {
  function generateLog(state, action) {
    console.group('--- useReducer Logger ---')
    console.log('prev state', state)
    console.log('action', action)
    console.log('next state', reducer(state, action))
    console.groupEnd()

    return reducer(state, action)
  }

  return generateLog
}

export default createLog
