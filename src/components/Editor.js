import styled from '@emotion/styled'
import { IconButton, Textarea as JoyTextarea, Tooltip } from '@mui/joy'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useCopyToClipboard } from 'react-use'
import { useSelector } from '../store'
import * as globalOptionsEntity from '../entities/globalOptions'
import * as editorEntity from '../entities/editor'
import { useCallback } from 'react'
import { run } from '@regenerate/core'
import { editorService } from '../services/editorService'
import { speechService } from '../services/speechService'
import Box from '@mui/joy/Box'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'

const Textarea = styled(JoyTextarea)`
  margin: 1rem;
  resize: none;
  min-height: 300px;
`

export function Editor ({ id }) {
  const { speak } = useSpeechSynthesis()
  const [, copyToClipboard] = useCopyToClipboard()

  const speakEnabled = useSelector(
    globalOptionsEntity.optionSpeakEnabledSelector
  )

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

  const handleDeleteTextClick = useCallback(() => {
    run(
      editorService.clearEditorContent(id)
    )
  }, [id])

  const handleSpeakToggleClick = useCallback(() => {
    run(
      speechService.toggleSpeakEnabledOption()
    )
  }, [])

  const handleCopyClick = useCallback(e => {
    copyToClipboard(content)
  }, [content, copyToClipboard])

  const handlePlayClick = useCallback(e => {
    speak({ text: content })
  }, [content, speak])

  return (
    <Textarea
      size="lg"
      value={content}
      onChange={handleTextareaChange}
      startDecorator={
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'right', width: '100%' }}>
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
          <Tooltip
            placement="bottom"
            arrow
            title={speakEnabled ? 'Desactivar audio' : 'Activar audio'}
          >
            <IconButton
              size="lg"
              variant="outlined"
              color="neutral"
              onClick={handleSpeakToggleClick}
            >
              {speakEnabled
                ? <VolumeUpIcon/>
                : <VolumeOffIcon/>}
            </IconButton>
          </Tooltip>
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
        </Box>
      }
    />
  )
}