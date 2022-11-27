import { optionSpeakEnabledSelector } from './selectors'

describe('optionSpeakEnabledSelector', () => {
  it('should return true in case speaking is enabled', () => {
    const state = {
      globalOptions: {
        speakEnabled: true
      }
    }

    const result = optionSpeakEnabledSelector(state)

    expect(result).toEqual(true)
  })

  it('should return false in case speaking is NOT enabled', () => {
    const state = {
      globalOptions: {
        speakEnabled: false
      }
    }

    const result = optionSpeakEnabledSelector(state)

    expect(result).toEqual(false)
  })

  it('should return false if the state is empty', () => {
    const state = {}

    const result = optionSpeakEnabledSelector(state)

    expect(result).toEqual(false)
  })
})