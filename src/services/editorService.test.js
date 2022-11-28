import { addTextToEditorMutation, setCurrentEditorMutation, setEditorContentMutation } from '../entities/editor'
import store from '../effects/store'

import { editorService } from './editorService'

describe('setEditorContent', () => {
  it('should use store.mutate with the setEditorContentMutation', () => {
    expect(
      editorService.setEditorContent('an-editor-id', 'editor content')
    ).toGenerateEffects([
      {
        effect: store.mutate(setEditorContentMutation, {
          id: 'an-editor-id',
          content: 'editor content'
        })
      }
    ])
  })
})

describe('addTextToEditor', () => {
  it('should use store.mutate with the addTextToEditorMutation', () => {
    expect(
      editorService.addTextToEditor('an-editor-id', 'text to be added')
    ).toGenerateEffects([
      {
        effect: store.mutate(addTextToEditorMutation, {
          id: 'an-editor-id',
          text: 'text to be added'
        })
      }
    ])
  })
})

describe('setCurrentEditor', () => {
  it('should use store.mutate with the setCurrentEditorMutation', () => {
    expect(
      editorService.setCurrentEditor('an-editor-id')
    ).toGenerateEffects([
      {
        effect: store.mutate(setCurrentEditorMutation, {
          id: 'an-editor-id',
        })
      }
    ])
  })
})

describe('clearEditorContent', () => {
  it('should use store.mutate with the setEditorContentMutation setting the content to ""', () => {
    expect(
      editorService.clearEditorContent('an-editor-id')
    ).toGenerateEffects([
      {
        effect: store.mutate(setEditorContentMutation, {
          id: 'an-editor-id',
          content: ''
        })
      }
    ])
  })
})