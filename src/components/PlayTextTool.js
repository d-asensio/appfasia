import { useSpeechSynthesis } from 'react-speech-kit'
import { useSelector } from '../store'
import * as editorEntity from '../entities/editor'
import { useCallback } from 'react'
import { IconButton, Tooltip } from '@mui/joy'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

export function PlayTextTool ({ editorId }) {
  const { speak } = useSpeechSynthesis()

  const { content } = useSelector(
    state => editorEntity.editorByIdSelector(state, editorId)
  )

  const handlePlayClick = useCallback(e => {
    speak({ text: content })
  }, [content, speak])

  return (
    <Tooltip
      placement="bottom"
      arrow
      title="Reproducir"
    >
      <IconButton
        size="lg"
        variant="outlined"
        color="neutral"
        onClick={handlePlayClick}
      >
        <PlayCircleIcon/>
      </IconButton>
    </Tooltip>
  )
}
