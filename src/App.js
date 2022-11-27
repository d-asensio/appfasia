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

import Box from '@mui/joy/Box'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

import { run } from '@regenerate/core'

import * as wordEntity from './entities/word'
import * as editorEntity from './entities/editor'
import * as globalOptionsEntity from './entities/globalOptions'
import { useSelector } from './store'
import { WordCategory } from './components/WordCategory'
import { editorService } from './services/editorService'
import { speechService } from './services/speechService'

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
  const [, copyToClipboard] = useCopyToClipboard()

  const speakEnabled = useSelector(
    globalOptionsEntity.optionSpeakEnabledSelector
  )

  const { content } = useSelector(
    state => editorEntity.editorByIdSelector(state, 'c13f8f60-1c78-4743-881f-b52940f15fe7')
  )

  const categoryIds = useSelector(
    wordEntity.wordCategoryIdListSelector
  )

  const handleWordClick = useCallback(e => {
    const clickedWord = e.target.innerText

    if (speakEnabled) {
      speak({ text: clickedWord })
    }

    run(
      editorService.addTextToEditor(
        'c13f8f60-1c78-4743-881f-b52940f15fe7',
        ` ${clickedWord}`
      )
    )
  }, [speak, speakEnabled])

  const handleTextareaChange = useCallback(e => {
    const writtenText = e.target.value

    run(
      editorService.setEditorContent(
        'c13f8f60-1c78-4743-881f-b52940f15fe7',
        writtenText
      )
    )
  }, [])

  const handleDeleteTextClick = useCallback(() => {
    run(
      editorService.clearEditorContent('c13f8f60-1c78-4743-881f-b52940f15fe7')
    )
  }, [])

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
    <CssVarsProvider>
      <CssBaseline/>
      <div className="App">
        <EditorTabs/>
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
        <SearchBox/>
        <WordOptions>
          {categoryIds.map(categoryId => (
            <WordCategory
              key={categoryId}
              id={categoryId}
              onWordClick={handleWordClick}
            />
          ))}
        </WordOptions>
      </div>
    </CssVarsProvider>
  )
}

export default App
