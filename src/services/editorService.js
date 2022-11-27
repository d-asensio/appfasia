import store from '../effects/store'
import { addTextToEditorMutation } from '../entities/editor'

export const editorService = (function IIFE () {
  function * addTextToEditor (id, text) {
    yield store.mutate(addTextToEditorMutation, { id, text })
  }

  return { addTextToEditor }
})()