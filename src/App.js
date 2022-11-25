import Button from '@mui/joy/Button'
import { CssVarsProvider } from '@mui/joy/styles'
import './App.css'
import 'normalize.css'
import { useCallback, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import { CssBaseline, IconButton, Textarea as JoyTextarea, Tooltip } from '@mui/joy'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import styled from '@emotion/styled'
import { useCopyToClipboard } from 'react-use'
import { initialState } from './InitialState'
import { Box } from '@mui/system'

const Textarea = styled(JoyTextarea)`
  margin: 1rem;
  resize: none;
  min-height: 300px;
`

const WordOptions = styled.div`
  margin: 0.5rem;
  text-align: start;

  > * {
    margin: 0.25rem;
  }
`

function App () {
  const { speak } = useSpeechSynthesis()
  const [text, setText] = useState(initialState.text)
  const [categories] = useState(initialState.categories)
  const [speakEnabled, setSpeakEnabled] = useState(true)
  const [, copyToClipboard] = useCopyToClipboard()

  const handleWordClick = useCallback(e => {
    const clickedWord = e.target.innerText

    if (speakEnabled) {
      speak({ text: clickedWord })
    }

    setText(`${text} ${clickedWord}`)
  }, [text, speak, speakEnabled])

  const handleTextareaChange = useCallback(e => {
    const writtenText = e.target.value

    setText(writtenText)
  }, [])

  const handleCopyClick = useCallback(e => {
    copyToClipboard(text)
  }, [text, copyToClipboard])

  const handlePlayClick = useCallback(e => {
    speak({ text })
  }, [text, speak])

  return (
    <CssVarsProvider>
      <CssBaseline/>
      <div className="App">
        <Textarea
          size="lg"
          value={text}
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
                  onClick={() => setSpeakEnabled(!speakEnabled)}
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
                  onClick={() => setText('')}
                >
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        <WordOptions>
          {categories.map(({ name, words, color }) => (
            <div>
              <h4>{name}</h4>
              {words.sort().map(word => (
                <Button
                  sx={{
                    background: color,
                    margin: '0.25rem'
                  }}
                  size="lg"
                  color="primary"
                  variant="solid"
                  key={word}
                  onClick={handleWordClick}
                >
                  {word}
                </Button>
              ))}
            </div>
          ))}
        </WordOptions>
      </div>
    </CssVarsProvider>
  )
}

export default App
