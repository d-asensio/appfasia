import { addTextToEditorMutation, setCurrentEditorMutation, setEditorContentMutation } from './mutations'

describe('setEditorTextMutation', () => {
  it('should replace the given editor content by the provided text', () => {
    const state = {
      editorsById: {
        'an-editor-id': {
          content: 'old text'
        }
      }
    }

    const result = setEditorContentMutation(state, { id: 'an-editor-id', content: 'new text' })

    expect(result).toStrictEqual({
      editorsById: {
        'an-editor-id': {
          content: 'new text'
        }
      }
    })
  })
})

describe('addTextToEditorMutation', () => {
  it('should append a text to the given editor starting from empty content', () => {
    const state = {
      editorsById: {
        'an-editor-id': {
          content: ''
        }
      }
    }

    const result = addTextToEditorMutation(state, { id: 'an-editor-id', text: 'new text' })

    expect(result).toStrictEqual({
      editorsById: {
        'an-editor-id': {
          content: 'new text'
        }
      }
    })
  })

  it('should append a text to the given editor when the editor already has some content', () => {
    const state = {
      editorsById: {
        'an-editor-id': {
          content: 'some content already here'
        }
      }
    }

    const result = addTextToEditorMutation(state, { id: 'an-editor-id', text: ', and more to come' })

    expect(result).toStrictEqual({
      editorsById: {
        'an-editor-id': {
          content: 'some content already here, and more to come'
        }
      }
    })
  })
})

describe('setCurrentEditor', () => {
  it('should replace the current editor by the provided one', () => {
    const state = {
      currentEditor: 'an-editor-id'
    }

    const result = setCurrentEditorMutation(state, { id: 'a-new-editor-id' })

    expect(result).toStrictEqual({
      currentEditor: 'a-new-editor-id'
    })
  })
})
