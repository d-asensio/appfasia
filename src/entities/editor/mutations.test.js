import { addTextToEditorMutation, setEditorContentMutation } from './mutations'

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