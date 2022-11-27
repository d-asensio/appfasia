import { useCallback } from 'react'
import { run } from '@regenerate/core'
import { editorService } from '../services/editorService'
import { IconButton, Tooltip } from '@mui/joy'
import DeleteIcon from '@mui/icons-material/Delete'

export function DeleteEditorTool ({ editorId }) {
  const handleDeleteTextClick = useCallback(() => {
    run(
      editorService.clearEditorContent(editorId)
    )
  }, [editorId])

  return (
    <Tooltip
      placement="bottom"
      arrow
      title="Eliminar texto"
    >
      <IconButton
        size="lg"
        variant="outlined"
        color="neutral"
        onClick={handleDeleteTextClick}
      >
        <DeleteIcon/>
      </IconButton>
    </Tooltip>
  )
}
