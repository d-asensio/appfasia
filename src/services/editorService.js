import store from '../effects/store'
import { addTextToEditorMutation, setEditorContentMutation } from '../entities/editor'

export const editorService = (function IIFE () {
  function * setEditorContent (id, content) {
    yield store.mutate(setEditorContentMutation, { id, content })
  }

  function * addTextToEditor (id, text) {
    yield store.mutate(addTextToEditorMutation, { id, text })
  }

  return { setEditorContent, addTextToEditor }
})()