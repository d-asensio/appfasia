import { addTextToEditorMutation } from './mutations'

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