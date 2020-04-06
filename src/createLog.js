function createLog(reducer) {
  function generateLog(state, action) {
    reducer.logger = () => {
      console.groupCollapsed(
        '%c--- useReducer Logger ---',
        'font-weight: bold;'
      )
      console.log('%cprev state', 'color: #9E9E9E;', state)
      console.log('%caction', 'color: #00AFF8;', action)
      console.log('%cnext state', 'color: #4AB14D;', reducer(state, action))
      console.groupEnd()
    }

    return reducer(state, action)
  }

  if (reducer.logger) reducer.logger()

  return generateLog
}

export default createLog
