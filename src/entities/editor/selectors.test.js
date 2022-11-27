import { editorIdListSelector } from './selectors'

describe('editorIdListSelector', () => {
  it('should return a list of editor ids', () => {
    const state = {
      editorsById: {
        anEditor: {},
        anotherEditor: {}
      }
    }

    const result = editorIdListSelector(state)

    expect(result).toStrictEqual([
      'anEditor',
      'anotherEditor'
    ])
  })

  it('should return an empty list when the state is empty', () => {
    const state = {}

    const result = editorIdListSelector(state)

    expect(result).toStrictEqual([])
  })
})