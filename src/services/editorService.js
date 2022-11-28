import store from '../effects/store'
import { addTextToEditorMutation, setCurrentEditorMutation, setEditorContentMutation } from '../entities/editor'

export const editorService = (function IIFE () {
  function * setEditorContent (id, content) {
    yield store.mutate(setEditorContentMutation, { id, content })
  }

  function * addTextToEditor (id, text) {
    yield store.mutate(addTextToEditorMutation, { id, text })
  }

  function * clearEditorContent (id) {
    yield store.mutate(setEditorContentMutation, { id, content: '' })
  }

  function * setCurrentEditor (id) {
    yield store.mutate(setCurrentEditorMutation, { id })
  }

  return {
    setEditorContent,
    addTextToEditor,
    clearEditorContent,
    setCurrentEditor
  }
})()