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

export function Editor ({ id }) {
  const { content } = useSelector(
    state => editorEntity.editorByIdSelector(state, id)
  )

  const handleTextareaChange = useCallback(e => {
    const writtenText = e.target.value

    run(
      editorService.setEditorContent(
        id,
        writtenText
      )
    )
  }, [id])

  return (
    <Textarea
      size="lg"
      value={content}
      onChange={handleTextareaChange}
      startDecorator={
        <ToolBar editorId={id}/>
      }
    />
  )
}