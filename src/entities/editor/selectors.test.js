import { editorByIdSelector, editorIdListSelector } from './selectors'

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

describe('editorByIdSelector', () => {
  it('should return the data of an editor given its id', () => {
    const editorData = {
      name: 'Editor name',
      content: 'editor content'
    }

    const state = {
      editorsById: {
        'an-editor-id': editorData
      }
    }

    const result = editorByIdSelector(state, 'an-editor-id')

    expect(result).toStrictEqual(editorData)
  })

  it('should return null when the provided id does not belong to any editor', () => {
    const state = {}

    const result = editorByIdSelector(state, 'an-unknown-editor')

    expect(result).toEqual(null)
  })
})