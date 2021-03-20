function createLog({ reducer, logHasBeenCalled, toggleSignLog }) {
  function reducerWithLog(state, action) {
    if (!logHasBeenCalled) {
      console.groupCollapsed('%c--- useReducer Logger ---', 'font-weight: bold;')
      console.log('%cprev state', 'color: #9E9E9E;', state)
      console.log('%caction', 'color: #00AFF8;', action)
      console.log('%cnext state', 'color: #4AB14D;', reducer(state, action))
      console.groupEnd()

      toggleSignLog()
    }

    return reducer(state, action)
  }

  return { reducerWithLog }
}

export default createLog
