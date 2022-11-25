import Button from '@mui/joy/Button'
import { CssVarsProvider } from '@mui/joy/styles';
import './App.css';
import 'normalize.css';
import { useCallback, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import { CssBaseline, IconButton } from '@mui/joy';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import styled from '@emotion/styled';

const initialState = {
  text: '',
  words: [
    'Yo',
    'Quiero',
    'Pancake',
    'Supercalifragilisticoespialidoso',
  ]
}

const Actions = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

function App() {
  const { speak } = useSpeechSynthesis();
  const [text, setText] = useState(initialState.text)
  const [words] = useState(initialState.words)
  const [speakEnabled, setSpeakEnabled] = useState(true);

  const handleWordClick = useCallback(e => {
    const clickedWord = e.target.innerText

    speak({ text: clickedWord })

    setText(`${text} ${clickedWord}`)
  }, [text, speak])

  const handleTextareaChange= useCallback(e => {
    const writtenText = e.target.value

    setText(writtenText)
  }, [])

  return (
    <CssVarsProvider>
      <CssBaseline />
      <div className="App">
        <Actions>
          <IconButton
            size="lg"
            variant='outlined'
            color='neutral'
            onClick={() => setSpeakEnabled(!speakEnabled)}
          >
            {speakEnabled
              ? <VolumeUpIcon />
              : <VolumeOffIcon />}
          </IconButton>
          <IconButton
            size="lg"
            variant='outlined'
            color='neutral'
            onClick={() => setSpeakEnabled(!speakEnabled)}
          >
            <ContentCopyIcon />
          </IconButton>
        </Actions>
        <textarea className='input-area' value={text} onChange={handleTextareaChange}/>
        <div className='word-options'>
          {words.map(word => (
            <Button   
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
      </div>
    </CssVarsProvider>
  );
}


export default App;
