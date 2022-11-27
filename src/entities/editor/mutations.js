import produce from 'immer'
import { editorByIdSelector } from './selectors'

export const addTextToEditorMutation = produce((state, {id, text}) => {
  const editor = editorByIdSelector(state, id)
  editor.content += text
})
