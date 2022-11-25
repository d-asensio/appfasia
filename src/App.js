import Button from '@mui/joy/Button'
import { CssVarsProvider } from '@mui/joy/styles'
import './App.css'
import 'normalize.css'
import { useCallback, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import { CssBaseline, IconButton } from '@mui/joy'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styled from '@emotion/styled'
import { useCopyToClipboard } from 'react-use'
import { initialState } from './InitialState'

const Actions = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  gap: 0.5rem;
`

const Textarea = styled.textarea`
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
        <Actions>
          <IconButton
            size="lg"
            variant="outlined"
            color="neutral"
            onClick={handlePlayClick}
          >
            <PlayCircleIcon/>
          </IconButton>
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
          <IconButton
            size="lg"
            variant="outlined"
            color="neutral"
            onClick={handleCopyClick}
          >
            <ContentCopyIcon/>
          </IconButton>
        </Actions>
        <Textarea
          value={text}
          onChange={handleTextareaChange}
        />
        <WordOptions>
          {categories.map(({ name, words, color}) => (
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
