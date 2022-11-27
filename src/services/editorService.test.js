import { addTextToEditorMutation } from '../entities/editor'
import store from '../effects/store'

import { editorService } from './editorService'

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