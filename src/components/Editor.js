import { useCallback } from 'react'
import styled from '@emotion/styled'
import { Textarea as JoyTextarea } from '@mui/joy'
import { useSelector } from '../store'
import * as editorEntity from '../entities/editor'
import { run } from '@regenerate/core'
import { editorService } from '../services/editorService'
import { ToolBar } from './ToolBar'

const Textarea = styled(JoyTextarea)`
  margin: 1rem;
  resize: none;
  min-height: 300px;
`

export function Editor () {
  const currentEditorId = useSelector(
    editorEntity.currentEditorSelector
  )

  const { content } = useSelector(
    state => editorEntity.editorByIdSelector(state, currentEditorId)
  )

  const handleTextareaChange = useCallback(e => {
    const writtenText = e.target.value

    run(
      editorService.setEditorContent(
        currentEditorId,
        writtenText
      )
    )
  }, [currentEditorId])

  return (
    <Textarea
      size="lg"
      value={content}
      onChange={handleTextareaChange}
      startDecorator={
        <ToolBar editorId={currentEditorId}/>
      }
    />
  )
}