import Button from '@mui/joy/Button'
import { CssVarsProvider } from '@mui/joy/styles'
import './App.css'
import 'normalize.css'
import { useCallback, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import { CssBaseline, IconButton, Textarea as JoyTextarea, TextField, Tooltip } from '@mui/joy'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

import styled from '@emotion/styled'
import { useCopyToClipboard } from 'react-use'
import { initialState } from './InitialState'

import Box from '@mui/joy/Box'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'


const Textarea = styled(JoyTextarea)`
  margin: 1rem;
  resize: none;
  min-height: 300px;
`

const featureFlags = (function IIFE () {
  const isEnabled = toggleName => process.env[`REACT_APP_FF_${toggleName}`] === 'true'

  return {isEnabled}
})()

const WordOptions = styled.div`
  margin: 0.5rem;
  text-align: start;

  > * {
    margin: 0.25rem;
  }
`

function EditorTabs () {
  const [index, setIndex] = useState(0)

  if (!featureFlags.isEnabled('TABS')) return null

  return (
    <Tabs
      aria-label="Pipeline"
      value={index}
      onChange={(event, value) => setIndex(value)}
      sx={{ '--Tabs-gap': '0px' }}
    >
      <TabList
        variant="plain"
        sx={{
          width: '100%',
          pt: 2,
          alignItems: 'flex-end',
          alignSelf: 'flex-start',
          [`& .${tabClasses.root}`]: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: 'transparent'
            },
            [`&.${tabClasses.selected}`]: {
              color: 'primary.plainColor',
              fontWeight: 'lg',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: 1,
                bottom: '-1px',
                left: 'var(--List-item-paddingLeft)',
                right: 'var(--List-item-paddingRight)',
                height: '3px',
                borderTopLeftRadius: '3px',
                borderTopRightRadius: '3px',
                bgcolor: 'primary.500'
              }
            }
          }
        }}
      >
        <Tab
          sx={{
            flexGrow: 0,
            display: 'flex',
            gap: '0.5em'
          }}
        >
          Pestaña 1{' '}
          <IconButton size="sm" variant="plain" color="neutral">
            <CloseIcon/>
          </IconButton>
        </Tab>
        <Tab
          sx={{
            flexGrow: 0,
            display: 'flex',
            gap: '0.5em'
          }}
        >
          Pestaña 2{' '}
          <IconButton size="sm" variant="plain" color="neutral">
            <CloseIcon/>
          </IconButton>
        </Tab>
        <Tab
          sx={{
            flexGrow: 0,
            display: 'flex',
            gap: '0.5em'
          }}
        >
          Pestaña 3{' '}
          <IconButton size="sm" variant="plain" color="neutral">
            <CloseIcon/>
          </IconButton>
        </Tab>
        <Box
          sx={{
            alignSelf: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <IconButton size="sm" variant="plain" color="neutral">
            <AddIcon/>
          </IconButton>
        </Box>
      </TabList>
      <Box
        sx={(theme) => ({
          '--bg': theme.vars.palette.background.level3,
          height: '1px',
          background: 'var(--bg)',
          boxShadow: '0 0 0 100vmax var(--bg)',
          clipPath: 'inset(0 -100vmax)'
        })}
      />
      <Box
        sx={(theme) => ({
          '--bg': theme.vars.palette.background.surface,
          background: 'var(--bg)',
          boxShadow: '0 0 0 100vmax var(--bg)',
          clipPath: 'inset(0 -100vmax)'
          // px: 4,
          // py: 2
        })}
      >
        <TabPanel value={0}></TabPanel>
        <TabPanel value={1}></TabPanel>
        <TabPanel value={2}></TabPanel>
      </Box>
    </Tabs>
  )
}

function SearchBox () {
  if (!featureFlags.isEnabled('SEARCH_BOX')) return null

  return (
    <div
      style={{
        padding: '0.5rem',
        width: '300px'
      }}
    >
      <TextField
        label="Buscar"
        placeholder="Busca una palabra..."
        endDecorator={
          <SearchIcon/>
        }
      />
    </div>
  )
}

function App () {
  const { speak } = useSpeechSynthesis()
  const [text, setText] = useState('')
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
        <EditorTabs/>
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
        <SearchBox/>
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
