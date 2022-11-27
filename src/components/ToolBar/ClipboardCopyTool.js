import { useCopyToClipboard } from 'react-use'
import { useSelector } from '../../store'
import * as editorEntity from '../../entities/editor'
import { useCallback } from 'react'
import { IconButton, Tooltip } from '@mui/joy'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export function ClipboardCopyTool ({ editorId }) {
  const [, copyToClipboard] = useCopyToClipboard()

  const { content } = useSelector(
    state => editorEntity.editorByIdSelector(state, editorId)
  )

  const handleCopyClick = useCallback(e => {
    copyToClipboard(content)
  }, [content, copyToClipboard])

  return (
    <Tooltip
      placement="bottom"
      arrow
      title="Copiar texto"
    >
      <IconButton
        size="lg"
        variant="outlined"
        color="neutral"
        onClick={handleCopyClick}
      >
        <ContentCopyIcon/>
      </IconButton>
    </Tooltip>
  )
}