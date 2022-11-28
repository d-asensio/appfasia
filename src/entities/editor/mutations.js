import produce from 'immer'
import { editorByIdSelector } from './selectors'

export const setEditorContentMutation = produce((state, {id, content}) => {
  const editor = editorByIdSelector(state, id)
  editor.content = content
})

export const addTextToEditorMutation = produce((state, {id, text}) => {
  const editor = editorByIdSelector(state, id)
  editor.content += text
})

export const setCurrentEditorMutation = produce((state, {id}) => {
  state.currentEditor = id
})
