import produce from 'immer'
import { globalOptionsSelector } from './selectors'

export const toggleSpeakEnabledOptionMutation = produce(state => {
  const options = globalOptionsSelector(state)
  options.speakEnabled = !options.speakEnabled
})
