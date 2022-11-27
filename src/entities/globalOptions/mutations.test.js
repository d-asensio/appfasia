import { toggleSpeakEnabledOptionMutation } from './mutations'

describe('toggleSpeakEnabledOptionMutation', () => {
  it('should toggle speakEnabled to false', () => {
    const state = {
      globalOptions: {
        speakEnabled: true
      }
    }

    const result = toggleSpeakEnabledOptionMutation(state)

    expect(result).toStrictEqual({
      globalOptions: {
        speakEnabled: false
      }
    })
  })

  it('should toggle speakEnabled to true', () => {
    const state = {
      globalOptions: {
        speakEnabled: false
      }
    }

    const result = toggleSpeakEnabledOptionMutation(state)

    expect(result).toStrictEqual({
      globalOptions: {
        speakEnabled: true
      }
    })
  })
})
