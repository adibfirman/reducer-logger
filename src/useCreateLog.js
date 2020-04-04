import { usePrevious } from './usePrevious'

export function useCreateLog(...args) {
  const state = args[0]
  const prevState = usePrevious(state)

  // console.group('action auth.set_info');
  // console.log('prev state', { name: 'adib' })
  // console.log('action', { type: 'auth.set_info' })
  // console.log('next state', { name: 'firman' })
  // console.groupEnd()

  console.log('prev state: ', prevState)
  console.log('next state: ', state)
}
