import { toggleSpeakEnabledOptionMutation } from '../entities/globalOptions/mutations'
import store from '../effects/store'

export const speechService = (function IIFE () {
  function * toggleSpeakEnabledOption () {
    yield store.mutate(toggleSpeakEnabledOptionMutation)
  }

  return { toggleSpeakEnabledOption }
})()
