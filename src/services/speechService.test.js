import store from '../effects/store'
import { speechService } from './speechService'
import { toggleSpeakEnabledOptionMutation } from '../entities/globalOptions/mutations'

describe('toggleSpeakEnabledOption', () => {
  it('should use store.mutate with the toggleSpeakEnabledOptionMutation', () => {
    expect(
      speechService.toggleSpeakEnabledOption()
    ).toGenerateEffects([
      {
        effect: store.mutate(toggleSpeakEnabledOptionMutation)
      }
    ])
  })
})
